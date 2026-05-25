import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Calendar, Car as CarIcon, Search } from 'lucide-react';

const searchBarReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
  }
};

export default function HeroSearch() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={searchBarReveal}
      className="mt-10 w-full max-w-4xl rounded-xl bg-[var(--color-canvas)] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.16)] sm:p-6"
    >
      <form className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        <div className="flex flex-col gap-2 rounded-md bg-[var(--color-canvas-soft)] p-3 focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-shadow">
          <label className="text-xs font-medium text-[var(--color-body)] uppercase tracking-wide">Lokasi Pickup</label>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[var(--color-primary)]" />
            <input 
              type="text" 
              placeholder="Kota atau Bandara" 
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-[var(--color-mute)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md bg-[var(--color-canvas-soft)] p-3 focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-shadow">
          <label className="text-xs font-medium text-[var(--color-body)] uppercase tracking-wide">Tanggal Pickup</label>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[var(--color-primary)]" />
            <input 
              type="date" 
              className="w-full bg-transparent text-sm font-medium outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md bg-[var(--color-canvas-soft)] p-3 focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-shadow">
          <label className="text-xs font-medium text-[var(--color-body)] uppercase tracking-wide">Tipe Mobil</label>
          <div className="flex items-center gap-2">
            <CarIcon size={18} className="text-[var(--color-primary)]" />
            <select className="w-full bg-transparent text-sm font-medium outline-none">
              <option value="">Semua Tipe</option>
              <option value="city-car">City Car</option>
              <option value="mpv">MPV</option>
              <option value="suv">SUV</option>
              <option value="sedan">Sedan</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2 md:pt-0">
          <button 
            type="button" 
            className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 text-lg font-medium text-[var(--color-on-primary)] transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
          >
            <Search size={20} />
            <span>Cari</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
