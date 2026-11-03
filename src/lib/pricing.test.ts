import { describe, expect, it } from 'vitest';
import { daysBetween, quote } from './pricing';

describe('quote', () => {
  it('multiplies the daily rate by days', () => {
    const q = quote('avanza', 3, 'lepas-kunci', false);
    expect(q.perDay).toBe(350000);
    expect(q.total).toBe(1050000);
    expect(q.dp).toBe(315000);
    expect(q.freeKm).toBe(900);
  });
  it('adds the driver per day and delivery once', () => {
    const q = quote('avanza', 2, 'with-driver', true);
    expect(q.perDay).toBe(525000);
    expect(q.total).toBe(525000 * 2 + 100000);
  });
  it('keeps the monthly estimate below the daily x 30 price', () => {
    const q = quote('fortuner', 30, 'lepas-kunci', false);
    expect(q.monthlyHigh).toBeLessThan(q.daily30);
    expect(q.monthlyLow).toBeLessThanOrEqual(q.monthlyHigh);
    expect(q.saveLow).toBe(35);
    expect(q.saveHigh).toBe(38);
  });
  it('treats days below 1 as 1 and rejects unknown cars', () => {
    expect(quote('brio', 0, 'lepas-kunci', false).total).toBe(280000);
    expect(() => quote('nope', 1, 'lepas-kunci', false)).toThrow();
  });
});

describe('daysBetween', () => {
  it('counts the pickup day', () => {
    expect(daysBetween(new Date(2026, 10, 12), new Date(2026, 10, 14))).toBe(3);
    expect(daysBetween(new Date(2026, 10, 12), new Date(2026, 10, 12))).toBe(1);
  });
});
