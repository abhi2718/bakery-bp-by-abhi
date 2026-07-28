import { Fragment, type ReactNode } from "react";

/**
 * Headings in config are written as "Pick your |occasion|." — the piped
 * span becomes the italic gradient flourish. Newlines become line breaks.
 */
export function accent(text: string): ReactNode {
  return text.split("|").map((chunk, i) => {
    const body = chunk.split("\n").map((line, j, all) => (
      <Fragment key={j}>
        {line}
        {j < all.length - 1 ? <br /> : null}
      </Fragment>
    ));
    return i % 2 === 1 ? <em key={i}>{body}</em> : <Fragment key={i}>{body}</Fragment>;
  });
}
