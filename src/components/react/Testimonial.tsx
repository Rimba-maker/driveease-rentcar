import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "Pakai monthly buat assignment 3 bulan di Surabaya. Sigap, responsif, mobil bagus. Bakal langganan kalau ada project lagi.",
    author: "Bayu",
    role: "Project Manager",
    rating: 5
  },
  {
    text: "Liburan keluarga ke Bali, ambil Innova with driver. Driver-nya ramah, hafal jalan tikus waktu macet parah. Sangat recommended!",
    author: "Keluarga Wijaya",
    role: "Wisatawan",
    rating: 5
  },
  {
    text: "Corporate fleet 15 unit untuk operational, sudah 2 tahun no issue. Account managernya gampang dihubungi 24 jam.",
    author: "PT Maju Bersama",
    role: "B2B Client",
    rating: 5
  },
  {
    text: "Reschedule mendadak karena flight delay, admin oke banget bantu atur ulang jadwal tanpa penalty. Fleksibel!",
    author: "Andini",
    role: "Solo Traveler",
    rating: 5
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-canvas-soft)] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl mb-16">
          Cerita Klien Kami
        </h2>

        <div 
          className="relative h-[250px] sm:h-[200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full"
            >
              <div className="flex gap-1 mb-6 text-[var(--color-ink)]">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-medium text-[var(--color-ink)] leading-relaxed mb-8 max-w-3xl">
                "{testimonials[currentIndex].text}"
              </p>
              <div>
                <p className="font-bold text-[var(--color-ink)]">{testimonials[currentIndex].author}</p>
                <p className="text-sm font-medium text-[var(--color-body)]">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-surface-pressed)] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-[var(--color-ink)]' : 'bg-[var(--color-mute)]'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-surface-pressed)] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
