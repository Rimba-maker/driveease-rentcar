import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cars, categories, rp, waLink, type CarCategory } from '../../data/site';

type Filter = 'Semua' | CarCategory;

export default function Fleet() {
  const [filter, setFilter] = useState<Filter>('Semua');
  const list = useMemo(
    () => (filter === 'Semua' ? cars : cars.filter((c) => c.category === filter)),
    [filter],
  );

  // The first tile is double size when there are enough cars; the closing tile
  // takes whatever is left of the last row so the board always ends flush.
  const big = list.length >= 5;
  const span = (cols: number, extra: number) => {
    const cells = list.length + (big ? extra : 0);
    return cells % cols === 0 ? cols : cols - (cells % cols);
  };

  return (
    <section id="armada" className="section wrap" aria-labelledby="armada-title">
      <div className="fleet-head">
        <div className="t tile">
          <h2 id="armada-title" className="head">Pilih mobil sesuai kebutuhan</h2>
          <p className="lead" style={{ maxWidth: '30ch' }}>
            Unit terpopuler bulan ini, dengan harga per hari yang tertera di depan.
          </p>
        </div>
        <div className="chips" role="group" aria-label="Kategori mobil">
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              className="chip"
              aria-pressed={filter === c.name}
              onClick={() => setFilter(c.name)}
            >
              <span className="n">{c.name}</span>
              <span className="f">{c.from}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="cars"
        aria-live="polite"
        style={{ ['--sp4' as string]: span(4, 3), ['--sp3' as string]: span(3, 3), ['--sp2' as string]: span(2, 1) }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((c, i) => (
            <motion.a
              layout
              key={c.id}
              href={waLink(`Halo DriveEase, saya mau sewa ${c.name}. Apakah unit tersedia?`)}
              target="_blank"
              rel="noopener"
              className={`car s${i % 4}${big && i === 0 ? ' big' : ''}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={c.image} alt={c.alt} width={800} height={1000} loading="lazy" decoding="async" />
              <span className="go">Sewa</span>
              <span className="info">
                <span className="nm">{c.name}</span>
                <span className="pr">{rp(c.pricePerDay)} / hari</span>
                <span className="sp">{c.seats} kursi · {c.transmission}</span>
              </span>
            </motion.a>
          ))}
        </AnimatePresence>
        <motion.div layout className="more tile tile--accent">
          <p className="lead">Unit yang kamu cari tidak ada di daftar?</p>
          <a className="btn btn--paper" href={waLink('Halo DriveEase, saya cari unit yang tidak ada di website.')} target="_blank" rel="noopener">
            Tanya via WhatsApp
          </a>
        </motion.div>
      </div>
      <style>{`
        .cars .more { grid-column: span var(--sp4); }
        @media (max-width: 1023px) { .cars .more { grid-column: span var(--sp3); } }
        @media (max-width: 767px) { .cars .more { grid-column: span var(--sp2); } }
      `}</style>
    </section>
  );
}
