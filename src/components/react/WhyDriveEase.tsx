import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Clock, CreditCard, Smartphone, ThumbsUp } from 'lucide-react';

const usps = [
  {
    title: 'Armada Maks. 3 Tahun',
    desc: 'Mobil selalu segar, wangi, dan jarang trouble karena peremajaan unit yang rutin.',
    icon: <ThumbsUp size={24} />
  },
  {
    title: 'Asuransi All Risk',
    desc: 'Bawa mobil dengan tenang. Segala kerusakan tak terduga ditanggung asuransi.',
    icon: <ShieldCheck size={24} />
  },
  {
    title: 'Service Rutin Berkala',
    desc: 'Setiap 5.000 km, oli & filter selalu diganti. Kondisi mesin selalu prima.',
    icon: <Wrench size={24} />
  },
  {
    title: '24/7 Roadside Assistance',
    desc: 'Mogok di mana pun, tim mekanik kami siap datang membantu 24 jam penuh.',
    icon: <Clock size={24} />
  },
  {
    title: 'Transparan, No Hidden Fee',
    desc: 'Harga di awal adalah yang Anda bayar. Tanpa biaya jebakan di akhir.',
    icon: <CreditCard size={24} />
  },
  {
    title: 'Booking Online Cepat',
    desc: 'Proses cuma 5 menit. Upload dokumen beres, tanpa telepon-telepon ribet.',
    icon: <Smartphone size={24} />
  }
];

export default function WhyDriveEase() {
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-on-dark)] py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Kenapa Pilih DriveEase
          </h2>
          <p className="mt-4 text-lg opacity-80">
            Fokus kami adalah kelancaran perjalanan Anda. Tanpa kompromi.
          </p>
        </div>

        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar gap-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex shrink-0 snap-start w-[80%] sm:w-[60%] md:w-auto flex-col rounded-2xl bg-[var(--color-black-elevated)] p-8 transition-colors hover:bg-[#333333]"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-on-dark)] text-[var(--color-ink)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{usp.title}</h3>
              <p className="text-sm leading-relaxed opacity-70">
                {usp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
