import { accent } from "@/lib/accent";

export default function SectionHead({
  eyebrow,
  title,
  blurb,
  center = false,
  flush = false,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  center?: boolean;
  flush?: boolean;
}) {
  return (
    <>
      <span className="eyebrow">{eyebrow}</span>
      <div className={`sec-head${center ? " center" : ""}${flush ? " flush" : ""}`}>
        <h2 className="display">{accent(title)}</h2>
        {blurb ? <p>{blurb}</p> : null}
      </div>
    </>
  );
}
