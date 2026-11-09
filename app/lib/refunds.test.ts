import { describe, expect, it } from "vitest";
import {
  getRefundAmount,
  isWithinRefundWindow,
  lastDayOfRefundWindow,
} from "./refunds";

describe("Refund Window", () => {
  const purchasedAt = new Date(2026, 0, 1, 23, 0).toISOString();

  it("ends on the fourteenth calendar day after the purchase", () => {
    expect(lastDayOfRefundWindow(purchasedAt)).toBe("2026-01-15");
  });

  it("is open for the whole of the last day", () => {
    expect(isWithinRefundWindow(purchasedAt, new Date(2026, 0, 15, 23, 59))).toBe(
      true
    );
  });

  it("is closed the day after", () => {
    expect(isWithinRefundWindow(purchasedAt, new Date(2026, 0, 16, 0, 1))).toBe(
      false
    );
  });
});

describe("Refund Amount", () => {
  it("is what the Learner actually paid", () => {
    expect(getRefundAmount({ amountPaid: 4900 })).toBe(4900);
  });
});
