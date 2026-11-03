import { cars, DRIVER_PER_DAY, DELIVERY_FEE } from '../data/site';

export type Mode = 'lepas-kunci' | 'with-driver';

export interface Quote {
  perDay: number;
  total: number;
  dp: number;
  freeKm: number;
  daily30: number;
  monthlyLow: number;
  monthlyHigh: number;
  saveLow: number;
  saveHigh: number;
}

// Estimasi paket bulanan: 62-65% dari tarif harian x 30 (angka sampel, konfirmasi klien).
export const MONTHLY_FACTOR = { low: 0.62, high: 0.65 } as const;
const round100k = (n: number) => Math.round(n / 100000) * 100000;

export function quote(carId: string, days: number, mode: Mode, delivery: boolean): Quote {
  const car = cars.find((c) => c.id === carId);
  if (!car) throw new Error(`Unknown car: ${carId}`);
  const d = Math.max(1, Math.floor(days));
  const perDay = car.pricePerDay + (mode === 'with-driver' ? DRIVER_PER_DAY : 0);
  const total = perDay * d + (delivery ? DELIVERY_FEE : 0);
  const daily30 = perDay * 30;
  return {
    perDay,
    total,
    dp: Math.round(total * 0.3),
    freeKm: d * 300,
    daily30,
    monthlyLow: round100k(daily30 * MONTHLY_FACTOR.low),
    monthlyHigh: round100k(daily30 * MONTHLY_FACTOR.high),
    saveLow: Math.round((1 - MONTHLY_FACTOR.high) * 100),
    saveHigh: Math.round((1 - MONTHLY_FACTOR.low) * 100),
  };
}

/** Whole days between two dates, counting the pickup day (min 1). */
export function daysBetween(from: Date, to: Date): number {
  const ms = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.max(1, Math.round(ms / 86400000) + 1);
}
