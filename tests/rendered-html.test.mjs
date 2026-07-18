import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("includes Rooted In Soul's essential brand and booking experience", async () => {
  const [page, layout, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Where Hair/);
  assert.match(page, /NEXT_PUBLIC_SQUARE_BOOKING_URL/);
  assert.match(page, /rootedinsoul\.co/);
  assert.match(page, /Tallahassee, Florida/);
  assert.match(layout, /Rooted In Soul \| Where Hair Is Heritage/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /booking-leopard/);
});
