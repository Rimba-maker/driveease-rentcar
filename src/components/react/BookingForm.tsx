import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, MapPin, Car, Phone, User, Info, CheckCircle2 } from 'lucide-react';
import { cars } from '../../data/cars';

const bookingSchema = z.object({
  name: z.string().min(3, "Nama terlalu pendek"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  pickupLocation: z.string().min(3, "Lokasi tidak valid"),
  pickupDate: z.string().min(1, "Tanggal harus diisi"),
  returnDate: z.string().min(1, "Tanggal kembali harus diisi"),
  carType: z.string().min(1, "Pilih tipe mobil"),
  serviceType: z.enum(['lepas-kunci', 'with-driver']),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui syarat & ketentuan"
  })
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: 'lepas-kunci'
    }
  });

  const onSubmit = (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const message = `Halo DriveEase Rentcar, saya ingin melakukan reservasi mobil dengan detail sebagai berikut:

*Detail Pemesan:*
- Nama: ${data.name}
- No. HP: ${data.phone}

*Detail Sewa:*
- Tipe Layanan: ${data.serviceType === 'lepas-kunci' ? 'Lepas Kunci (Self-Drive)' : 'Dengan Driver'}
- Tipe Mobil: ${data.carType}
- Lokasi Pickup: ${data.pickupLocation}
- Tanggal Pickup: ${data.pickupDate}
- Tanggal Kembali: ${data.returnDate}

Apakah unit tersedia di tanggal tersebut? Terima kasih.`;

    const waLink = `https://wa.me/628110000000?text=${encodeURIComponent(message)}`;
    
    // Simulate short loading state
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waLink, '_blank');
    }, 800);
  };

  const serviceType = watch('serviceType');

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
        <div className="w-full lg:w-[45%] text-[var(--color-on-dark)] pt-8">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
            Booking Sekarang, Mobil Siap Esok
          </h2>
          <p className="text-lg opacity-80 mb-10 leading-relaxed">
            Pesan armada Anda hari ini. Proses cepat, tanpa ribet, dan harga yang transparan. Admin kami akan langsung mengkonfirmasi ketersediaan unit via WhatsApp.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold">Konfirmasi Cepat</h4>
                <p className="text-sm opacity-70">Respon di bawah 15 menit</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold">DP Ringan</h4>
                <p className="text-sm opacity-70">Hanya 30% untuk kunci jadwal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%]">
          <div className="bg-[var(--color-canvas)] rounded-2xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] text-[var(--color-ink)]">
            <h3 className="text-2xl font-bold mb-6">Form Reservasi</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold">Nama Lengkap</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                    <input 
                      {...register("name")}
                      type="text" 
                      placeholder="John Doe"
                      className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border ${errors.name ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                    />
                  </div>
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                    <input 
                      {...register("phone")}
                      type="tel" 
                      placeholder="08123456789"
                      className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border ${errors.phone ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                    />
                  </div>
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold">Layanan</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`cursor-pointer rounded-md border py-3 px-4 text-center text-sm font-bold transition-colors ${serviceType === 'lepas-kunci' ? 'bg-[var(--color-ink)] text-[var(--color-on-dark)] border-[var(--color-ink)]' : 'bg-[var(--color-canvas-soft)] text-[var(--color-ink)] border-transparent'}`}>
                    <input type="radio" value="lepas-kunci" {...register("serviceType")} className="hidden" />
                    Lepas Kunci
                  </label>
                  <label className={`cursor-pointer rounded-md border py-3 px-4 text-center text-sm font-bold transition-colors ${serviceType === 'with-driver' ? 'bg-[var(--color-ink)] text-[var(--color-on-dark)] border-[var(--color-ink)]' : 'bg-[var(--color-canvas-soft)] text-[var(--color-ink)] border-transparent'}`}>
                    <input type="radio" value="with-driver" {...register("serviceType")} className="hidden" />
                    With Driver
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold">Tipe Mobil</label>
                <div className="relative">
                  <Car size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                  <select 
                    {...register("carType")}
                    className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border appearance-none ${errors.carType ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                  >
                    <option value="">Pilih Mobil</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.name}>{car.name} ({car.category})</option>
                    ))}
                    <option value="Lainnya">Lainnya (Konsultasi CS)</option>
                  </select>
                </div>
                {errors.carType && <span className="text-xs text-red-500">{errors.carType.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold">Lokasi Pengambilan</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                  <input 
                    {...register("pickupLocation")}
                    type="text" 
                    placeholder="Alamat / Bandara / Hotel"
                    className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border ${errors.pickupLocation ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                  />
                </div>
                {errors.pickupLocation && <span className="text-xs text-red-500">{errors.pickupLocation.message}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold">Tanggal Mulai</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                    <input 
                      {...register("pickupDate")}
                      type="date" 
                      className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border ${errors.pickupDate ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                    />
                  </div>
                  {errors.pickupDate && <span className="text-xs text-red-500">{errors.pickupDate.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold">Tanggal Selesai</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mute)]" />
                    <input 
                      {...register("returnDate")}
                      type="date" 
                      className={`w-full rounded-md bg-[var(--color-canvas-soft)] py-3.5 pl-10 pr-4 min-h-[44px] text-sm font-medium outline-none border ${errors.returnDate ? 'border-red-500' : 'border-transparent focus:border-[var(--color-surface-pressed)]'}`}
                    />
                  </div>
                  {errors.returnDate && <span className="text-xs text-red-500">{errors.returnDate.message}</span>}
                </div>
              </div>

              <div className="mt-2 p-4 rounded-md bg-blue-50 border border-blue-100 flex items-start gap-3">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  Penyewaan akan dilanjutkan via WhatsApp. Tim kami akan mengecek ketersediaan unit dan mengirimkan invoice untuk pembayaran DP.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input type="checkbox" {...register("agreeTerms")} className="peer appearance-none w-5 h-5 border-2 border-[var(--color-mute)] rounded-sm checked:bg-[var(--color-ink)] checked:border-[var(--color-ink)] focus:outline-none transition-colors" />
                    <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <span className="text-sm text-[var(--color-body)] group-hover:text-[var(--color-ink)] transition-colors">
                    Saya menyetujui syarat & ketentuan sewa, termasuk persyaratan dokumen wajib (KTP & SIM A).
                  </span>
                </label>
                {errors.agreeTerms && <span className="text-xs text-red-500 ml-8">{errors.agreeTerms.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 w-full rounded-full bg-[var(--color-primary)] py-4 text-base font-bold text-[var(--color-on-primary)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  'Lanjut ke WhatsApp'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
