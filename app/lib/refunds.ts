// The rules for a Refund Request, shared by the course page (which decides
// whether to offer one) and the refund route (which accepts one). See the
// Refunds section of GLOSSARY.md.

export const REFUND_WINDOW_DAYS = 14;
export const REFUND_WATCH_LIMIT_SECONDS = 2 * 60 * 60;
export const REFUND_COMPLETION_LIMIT = 0.5;

// The Refund Window is counted in whole calendar days, not hours — someone who
// buys at 23:00 still gets the whole of their fourteenth day.
export function calendarDay(when: Date): string {
  const month = String(when.getMonth() + 1).padStart(2, "0");
  const day = String(when.getDate()).padStart(2, "0");
  return `${when.getFullYear()}-${month}-${day}`;
}

export function lastDayOfRefundWindow(purchasedAtIso: string): string {
  const deadline = new Date(purchasedAtIso);
  deadline.setDate(deadline.getDate() + REFUND_WINDOW_DAYS);
  return calendarDay(deadline);
}

export function isWithinRefundWindow(
  purchasedAtIso: string,
  now: Date = new Date()
): boolean {
  const today = calendarDay(now);
  return (
    today >= calendarDay(new Date(purchasedAtIso)) &&
    today <= lastDayOfRefundWindow(purchasedAtIso)
  );
}

/** A Refund is always for what the Learner actually paid. */
export function getRefundAmount(purchase: { amountPaid: number }): number {
  return purchase.amountPaid;
}
