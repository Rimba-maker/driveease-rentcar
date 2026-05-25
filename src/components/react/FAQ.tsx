import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Syarat sewa lepas kunci apa saja?',
    a: 'Wajib memiliki SIM A aktif, KTP asli yang akan ditahan selama masa sewa, dan deposit uang tunai sebesar Rp 1-3 juta (tergantung jenis mobil) yang akan dikembalikan setelah selesai masa sewa.'
  },
  {
    q: 'Bisa antar jemput di bandara?',
    a: 'Tentu bisa! Kami menyediakan layanan pengantaran ke bandara atau hotel. Terdapat biaya tambahan sebesar Rp 100k untuk delivery di dalam area kota cabang.'
  },
  {
    q: 'Bagaimana jika mobil mengalami kerusakan?',
    a: 'Semua armada kami dilindungi asuransi All Risk. Anda hanya perlu membayar biaya claim (deductible) sebesar Rp 500k per kejadian. Selebihnya akan ditanggung oleh asuransi.'
  },
  {
    q: 'Bisa dipakai untuk ke luar kota?',
    a: 'Bisa. Terdapat batas free jarak tempuh sejauh 300km/hari. Kelebihan jarak akan dikenakan charge per km sesuai dengan tipe mobil yang disewa.'
  },
  {
    q: 'Metode pembayaran apa saja yang diterima?',
    a: 'Kami menerima berbagai metode pembayaran: Transfer Bank (Virtual Account), Kartu Kredit, QRIS, GoPay, dan OVO.'
  },
  {
    q: 'Bisa request mobil yang tidak ada di website?',
    a: 'Bisa. Kami memiliki jaringan mitra luas. Silakan hubungi CS kami untuk berkonsultasi mengenai tipe mobil spesifik yang Anda butuhkan.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          Pertanyaan Umum (FAQ)
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-[var(--color-surface-pressed)]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div key={index} className="py-6">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between text-left focus:outline-none group"
              >
                <span className="text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-canvas-soft)] text-[var(--color-ink)] group-hover:bg-[var(--color-surface-pressed)]"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-base text-[var(--color-body)] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
