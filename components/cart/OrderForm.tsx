"use client";

import { useMemo, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import { site } from "@/config/site.config";
import type { OrderDetails } from "@/types";
import { addDays, isoDate, makeOrderId, money, prettyDate } from "@/lib/format";
import {
  buildOrderMessage,
  needsLongLead,
  productById,
  unitPrice,
  waLink,
} from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { BagIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/Icons";

type FieldKey = "name" | "phone" | "occasion" | "date" | "address";
const REQUIRED: FieldKey[] = ["name", "phone", "occasion", "date", "address"];

export default function OrderForm({
  bodyRef,
  details,
  setDetails,
}: {
  bodyRef: RefObject<HTMLDivElement | null>;
  details: OrderDetails;
  setDetails: Dispatch<SetStateAction<OrderDetails>>;
}) {
  const { cart, total, clear, setView, setLastOrder, showToast } = useCart();
  const [bad, setBad] = useState<Partial<Record<FieldKey, boolean>>>({});

  const longLead = useMemo(() => needsLongLead(cart), [cart]);
  const lead = longLead ? site.ordering.weddingLeadDays : site.ordering.leadDays;
  const earliest = useMemo(() => isoDate(addDays(new Date(), lead)), [lead]);

  const set = (k: keyof OrderDetails, v: string) =>
    setDetails((d) => ({ ...d, [k]: v } as OrderDetails));

  function submit() {
    if (!cart.length) return;

    const phone = details.phone.replace(/\D/g, "");
    const problems: Partial<Record<FieldKey, boolean>> = {
      name: !details.name.trim(),
      // 10 digits, or 12 with the country code already typed in
      phone: !(phone.length === 10 || (phone.length === 12 && phone.startsWith("91"))),
      occasion: !details.occasion,
      date: !details.date || details.date < earliest,
      address: details.mode !== "Pickup" && !details.address.trim(),
    };
    setBad(problems);

    const first = REQUIRED.find((k) => problems[k]);
    if (first) {
      const el = document.querySelector<HTMLElement>(`[data-f="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.querySelector<HTMLElement>("input,select,textarea")?.focus({ preventScroll: true });
      showToast("Please check the highlighted fields");
      return;
    }

    // build the message before the basket is emptied — it reads from the cart
    const id = makeOrderId();
    const message = buildOrderMessage(id, details, cart);
    const url = waLink(message);

    // opened straight from the click, so pop-up blockers leave it alone
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;

    setLastOrder({ id, message });
    clear(true);
    // a stale date or address left in the form is worse than retyping a name
    setDetails((d) => ({
      ...d,
      occasion: "",
      date: "",
      address: "",
      msg: "",
      notes: "",
    }));
    setView("sent");
  }

  const fld = (k: FieldKey) => `fld${bad[k] ? " bad" : ""}`;

  return (
    <>
      <div className="drawer-body" ref={bodyRef}>
        <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
          <div className={fld("name")} data-f="name">
            <label htmlFor="f-name">
              Your name <span className="req">*</span>
            </label>
            <input
              id="f-name"
              type="text"
              autoComplete="name"
              placeholder="Who should we bake for?"
              value={details.name}
              onChange={(e) => set("name", e.target.value)}
            />
            <span className="err">Please tell us your name</span>
          </div>

          <div className={fld("phone")} data-f="phone">
            <label htmlFor="f-phone">
              Phone / WhatsApp number <span className="req">*</span>
            </label>
            <input
              id="f-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={details.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
            <span className="hint">
              So {site.brand.owner} can confirm the order and the delivery time.
            </span>
            <span className="err">Please enter a valid 10-digit mobile number</span>
          </div>

          <div className={fld("occasion")} data-f="occasion">
            <label htmlFor="f-occasion">
              What&rsquo;s the occasion? <span className="req">*</span>
            </label>
            <select
              id="f-occasion"
              value={details.occasion}
              onChange={(e) => set("occasion", e.target.value)}
            >
              <option value="">Choose an occasion…</option>
              {site.ordering.occasions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="err">Please pick the occasion</span>
          </div>

          <div className="fld two">
            <div className={fld("date")} data-f="date">
              <label htmlFor="f-date">
                Needed on <span className="req">*</span>
              </label>
              <input
                id="f-date"
                type="date"
                min={earliest}
                value={details.date}
                onChange={(e) => set("date", e.target.value)}
              />
              <span className="err">Pick a date from {prettyDate(earliest)} onwards</span>
            </div>
            <div className="fld" data-f="slot">
              <label htmlFor="f-slot">Time</label>
              <select
                id="f-slot"
                value={details.slot}
                onChange={(e) => set("slot", e.target.value)}
              >
                {site.ordering.timeSlots.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="lead-hint">
            {longLead
              ? `Your basket needs longer notice, so the earliest date is ${prettyDate(
                  earliest
                )} (${lead} days).`
              : `Earliest date is ${prettyDate(earliest)} — we need ${lead} days' notice.`}
          </p>

          <div className="fld" data-f="mode">
            <label>
              Pickup or delivery? <span className="req">*</span>
            </label>
            <div className="segs">
              <label className="seg">
                <input
                  type="radio"
                  name="mode"
                  value="Delivery"
                  checked={details.mode !== "Pickup"}
                  onChange={() => set("mode", "Delivery")}
                />
                <TruckIcon /> Delivery
              </label>
              <label className="seg">
                <input
                  type="radio"
                  name="mode"
                  value="Pickup"
                  checked={details.mode === "Pickup"}
                  onChange={() => set("mode", "Pickup")}
                />
                <BagIcon /> Pickup
              </label>
            </div>
          </div>

          {details.mode !== "Pickup" ? (
            <div className={fld("address")} data-f="address">
              <label htmlFor="f-address">
                Delivery address <span className="req">*</span>
              </label>
              <textarea
                id="f-address"
                rows={3}
                placeholder="Flat / house, street, landmark, area, pincode"
                value={details.address}
                onChange={(e) => set("address", e.target.value)}
              />
              <span className="hint">
                A landmark helps — deliveries are done by hand.
              </span>
              <span className="err">Please add the full delivery address</span>
            </div>
          ) : null}

          <div className="fld" data-f="msg">
            <label htmlFor="f-msg">Message to write on the cake</label>
            <input
              id="f-msg"
              type="text"
              maxLength={60}
              placeholder="e.g. Happy Birthday Riya"
              value={details.msg}
              onChange={(e) => set("msg", e.target.value)}
            />
            <span className="hint">Leave it blank if you&rsquo;d rather have it plain.</span>
          </div>

          <div className="fld" data-f="notes">
            <label htmlFor="f-notes">Allergies or anything else</label>
            <textarea
              id="f-notes"
              rows={3}
              placeholder="Nut allergy, a colour theme, a reference photo you'll send…"
              value={details.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
            <span className="hint">{site.ordering.dietNote}</span>
          </div>

          <div className="review">
            <h4>Your order</h4>
            {cart.map((l) => {
              const p = productById(l.id);
              if (!p) return null;
              return (
                <div className="r" key={`${l.id}-${l.unit}-${l.lowSugar}`}>
                  <span>
                    {p.name} · {l.unit}
                    {l.lowSugar ? ` · ${site.ordering.variant.shortLabel.toLowerCase()}` : ""} ×{" "}
                    {l.qty}
                  </span>
                  <b>{money(unitPrice(l) * l.qty)}</b>
                </div>
              );
            })}
            <div className="r total">
              <span>Estimated total</span>
              <b>{money(total)}</b>
            </div>
          </div>
        </form>
      </div>

      <div className="drawer-foot">
        <button className="btn btn-wa block" type="button" onClick={submit}>
          <WhatsAppIcon />
          Send order on WhatsApp
        </button>
        <button
          className="btn btn-ghost btn-sm block"
          type="button"
          onClick={() => setView("cart")}
        >
          Back to basket
        </button>
        <p className="note">
          Nothing is paid here. This opens WhatsApp with your order written out,
          and {site.brand.owner} confirms the price and advance there.
        </p>
      </div>
    </>
  );
}
