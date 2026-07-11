import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, type CarCategory } from '../../data/cars';
import { Users, Settings, Fuel } from 'lucide-react';

const categories: { id: CarCategory | 'All', label: string }[] = [
  { id: 'All', label: 'Semua Mobil' },
  { id: 'City Car', label: 'City Car' },
  { id: 'MPV', label: 'MPV' },
  { id: 'SUV', label: 'SUV' },
  { id: 'Sedan', label: 'Sedan/Executive' },
  { id: 'Bus', label: 'Bus & Hiace' }
];

export default function FleetShowcase() {
  const [activeCategory, setActiveCategory] = useState<CarCategory | 'All'>('All');

  const filteredCars = cars.filter(car => 
    activeCategory === 'All' ? true : car.category === activeCategory
  );

  return (
    <section id="armada" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          Pilih Mobil Sesuai Kebutuhan
        </h2>
        <p className="mt-4 text-lg text-[var(--color-body)]">
          Armada terawat maksimal 3 tahun. Harga transparan, no hidden fee.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex min-h-[44px] items-center justify-center rounded-full px-6 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] ${
              activeCategory === cat.id 
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]' 
                : 'bg-[var(--color-canvas-soft)] text-[var(--color-ink)] hover:bg-[var(--color-surface-pressed)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <motion.div layout className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar gap-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredCars.map((car) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={car.id}
              className="group flex shrink-0 snap-start w-[80%] sm:w-[60%] md:w-auto flex-col overflow-hidden rounded-2xl bg-[var(--color-canvas)] shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.16)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-canvas-soft)]">
                <img 
                  src={car.imageUrl} 
                  alt={car.name} 
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 rounded-full bg-[var(--color-canvas)] px-3 py-1 text-xs font-bold text-[var(--color-ink)] shadow-sm">
                  {car.category}
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[var(--color-ink)]">{car.name}</h3>
                </div>
                
                <div className="mb-6 flex items-end gap-1">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    Rp {car.pricePerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-mute)] mb-1">/hari</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm font-medium text-[var(--color-body)]">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[var(--color-mute)]" />
                    <span>{car.seats} Kursi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings size={16} className="text-[var(--color-mute)]" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-[var(--color-canvas-soft)] text-sm font-bold text-[var(--color-ink)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]">
                    Sewa Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
