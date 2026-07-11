import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const branches = [
  'Soekarno-Hatta Airport (CGK)',
  'Kemayoran, Jakarta',
  'TB Simatupang, Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Ngurah Rai Airport (DPS)',
  'Kuta, Bali',
  'Medan'
];

export default function CoverageArea() {
  return (
    <section id="cabang" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          Cabang Kami
        </h2>
        <p className="mt-4 text-lg text-[var(--color-body)]">
          Hadir di 8 kota besar. Tersedia layanan antar (delivery) langsung ke hotel atau rumah Anda di area cabang.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-square shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-[var(--color-canvas-soft)]"
          >
            {/* Using a placeholder map image since actual map integration wasn't strictly specified via a library */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
              alt="Peta Cabang Indonesia" 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Overlay a few decorative pins */}
            <div className="absolute top-[30%] left-[20%] flex flex-col items-center">
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[var(--color-primary)] items-center justify-center text-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </span>
              </span>
            </div>
            <div className="absolute bottom-[40%] right-[30%] flex flex-col items-center">
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[var(--color-primary)] items-center justify-center text-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2">
            {branches.map((branch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex shrink-0 snap-start w-[70%] sm:w-auto items-center gap-3 p-4 rounded-xl bg-[var(--color-canvas-soft)] hover:bg-[var(--color-surface-pressed)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-canvas)] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin size={18} className="text-[var(--color-ink)]" />
                </div>
                <span className="text-sm font-bold text-[var(--color-ink)]">{branch}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-xl bg-[var(--color-ink)] text-[var(--color-on-dark)]">
            <h3 className="font-bold mb-2">Punya pertanyaan seputar coverage?</h3>
            <p className="text-sm opacity-80 mb-4">Kami melayani rute luar kota dengan perhitungan jarak yang transparan.</p>
            <button className="text-sm font-medium border-b border-[var(--color-on-dark)] pb-0.5 hover:opacity-70 transition-opacity">
              Hubungi CS Kami
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
