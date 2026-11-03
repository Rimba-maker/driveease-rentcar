import { useState } from 'react';
import { cars, rp, rpShort, waLink, DELIVERY_FEE } from '../../data/site';
import { quote, type Mode } from '../../lib/pricing';

export default function Calculator() {
  const [carId, setCarId] = useState('avanza');
  const [days, setDays] = useState(3);
  const [mode, setMode] = useState<Mode>('lepas-kunci');
  const [delivery, setDelivery] = useState(false);

  const car = cars.find((c) => c.id === carId)!;
  const { perDay, total, dp, freeKm: km, daily30, monthlyLow, monthlyHigh, saveLow, saveHigh } = quote(carId, days, mode, delivery);
  const longStay = days >= 20;

  const message = `Halo DriveEase, saya mau sewa ${car.name} ${days} hari (${mode === 'with-driver' ? 'with driver' : 'lepas kunci'})${delivery ? ' dengan delivery' : ''}. Estimasi total ${rp(total)}. Apakah unit tersedia?`;

  return (
    <div className="calc board12" aria-labelledby="calc-title">
      <div className="in tile tile--ink">
        <h3 id="calc-title" className="lead strong" style={{ textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          Hitung sewamu
        </h3>

        <div>
          <label htmlFor="calc-car">Mobil</label>
          <select id="calc-car" value={carId} onChange={(e) => setCarId(e.target.value)}>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="lbl" id="calc-days-l">Lama sewa</span>
          <div className="stepper" role="group" aria-labelledby="calc-days-l">
            <button type="button" aria-label="Kurangi satu hari" onClick={() => setDays((d) => Math.max(1, d - 1))}>−</button>
            <output aria-live="polite">{days} hari</output>
            <button type="button" aria-label="Tambah satu hari" onClick={() => setDays((d) => Math.min(90, d + 1))}>+</button>
          </div>
        </div>

        <div>
          <span className="lbl" id="calc-mode-l">Layanan</span>
          <div className="seg" role="group" aria-labelledby="calc-mode-l">
            <button type="button" aria-pressed={mode === 'lepas-kunci'} onClick={() => setMode('lepas-kunci')}>Lepas kunci</button>
            <button type="button" aria-pressed={mode === 'with-driver'} onClick={() => setMode('with-driver')}>With driver</button>
          </div>
        </div>

        <label className="check" style={{ marginBottom: 0 }}>
          <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
          <span>Antar ke hotel atau bandara (+{rpShort(DELIVERY_FEE)})</span>
        </label>
      </div>

      <div className="out tile">
        <div>
          <p className="total" aria-live="polite">{rp(total)}</p>
          <p className="body" style={{ marginTop: 14 }}>
            Estimasi total {car.name}, {days} hari, {rp(perDay)} per hari{mode === 'with-driver' ? ' termasuk driver' : ''}.
          </p>
        </div>

        <div className="facts">
          <div className="fact"><b>{rp(dp)}</b><span className="small">DP 30% untuk booking</span></div>
          <div className="fact"><b>{new Intl.NumberFormat('id-ID').format(km)} km</b><span className="small">jarak bebas (300 km per hari)</span></div>
          <div className={`fact${longStay ? ' hot' : ''}`} style={{ gridColumn: 'span 2' }}>
            <b>Paket bulanan {rpShort(monthlyLow)}–{rpShort(monthlyHigh)}</b>
            <span className="small">
              dibanding {rp(daily30)} bila dihitung harian x 30. Hemat {saveLow}–{saveHigh}%.
            </span>
          </div>
        </div>

        <a className="btn" style={{ alignSelf: 'flex-start' }} href={waLink(message)} target="_blank" rel="noopener">
          Kirim hitungan ke WhatsApp
        </a>
      </div>
    </div>
  );
}
