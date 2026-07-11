import React from 'react';
import { motion } from 'framer-motion';
import { Key, UserCheck, CheckCircle2 } from 'lucide-react';

const options = [
  {
    title: 'Lepas Kunci (Self-Drive)',
    icon: <Key size={32} className="text-[var(--color-primary)]" />,
    price: 'Mulai Rp 250k',
    priceSub: '/hari',
    features: [
      'Harga sewa lebih hemat',
      'Bebas atur waktu & rute perjalanan',
      'Privasi maksimal bersama keluarga/teman',
      'Wajib SIM A, KTP, dan deposit jaminan',
      'Minimum booking: 12 jam'
    ]
  },
  {
    title: 'With Driver',
    icon: <UserCheck size={32} className="text-[var(--color-primary)]" />,
    price: 'Mulai Rp 400k',
    priceSub: '/hari + driver Rp 175k',
    features: [
      'Driver berpengalaman & ber-SIM A umum',
      'Lebih santai, fokus liburan atau meeting',
      'Termasuk gaji & makan driver',
      'Bebas dari tanggung jawab ganti rugi minor',
      'Minimum booking: 8 jam'
    ],
    highlight: true
  }
];

export default function RentalOptions() {
  return (
    <section id="layanan" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          Lepas Kunci atau With Driver?
        </h2>
        <p className="mt-4 text-lg text-[var(--color-body)]">
          Pilih layanan yang paling sesuai dengan gaya perjalanan Anda. Keduanya sama nyamannya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`relative flex flex-col rounded-2xl p-8 transition-transform hover:scale-[1.02] ${
              opt.highlight 
                ? 'bg-[var(--color-ink)] text-[var(--color-on-dark)] shadow-[0_4px_24px_rgba(0,0,0,0.24)]' 
                : 'bg-[var(--color-canvas)] border border-[var(--color-surface-pressed)] shadow-sm hover:shadow-md text-[var(--color-ink)]'
            }`}
          >
            {opt.highlight && (
              <div className="absolute -top-4 right-8 rounded-full bg-[var(--color-canvas)] px-4 py-1 text-xs font-bold text-[var(--color-ink)] shadow-md">
                Paling Populer
              </div>
            )}
            
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full ${opt.highlight ? 'bg-[var(--color-black-elevated)]' : 'bg-[var(--color-canvas-soft)]'}`}>
              {opt.highlight ? <UserCheck size={32} className="text-[var(--color-on-dark)]" /> : opt.icon}
            </div>

            <h3 className="text-2xl font-bold mb-2">{opt.title}</h3>
            
            <div className="mb-8 flex items-baseline gap-1 border-b border-[var(--color-surface-pressed)] pb-6 opacity-80">
              <span className="text-3xl font-bold">{opt.price}</span>
              <span className="text-sm font-medium">{opt.priceSub}</span>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1">
              {opt.features.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className={`mt-0.5 shrink-0 ${opt.highlight ? 'text-[var(--color-on-dark)] opacity-70' : 'text-[var(--color-primary)]'}`} />
                  <span className={`text-sm ${opt.highlight ? 'text-[var(--color-on-dark)] opacity-90' : 'text-[var(--color-body)]'}`}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <button className={`mt-auto w-full rounded-full py-4 text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] ${
              opt.highlight
                ? 'bg-[var(--color-canvas)] text-[var(--color-ink)]'
                : 'bg-[var(--color-primary)] text-[var(--color-on-primary)]'
            }`}>
              Pilih {opt.title.split(' ')[0]}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
