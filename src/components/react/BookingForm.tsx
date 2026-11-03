import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { branchCities, cars, waLink } from '../../data/site';

const schema = z.object({
  name: z.string().min(3, 'Nama terlalu pendek'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  pickupLocation: z.string().min(1, 'Pilih lokasi pickup'),
  pickupDate: z.string().min(1, 'Isi tanggal pickup'),
  returnDate: z.string().min(1, 'Isi tanggal kembali'),
  carType: z.string().min(1, 'Pilih mobil'),
  serviceType: z.enum(['lepas-kunci', 'with-driver']),
});
type Data = z.infer<typeof schema>;

export default function BookingForm() {
  const [sent, setSent] = useState<string | null>(null);
  const {
    register, handleSubmit, watch, setValue, formState: { errors },
  } = useForm<Data>({ resolver: zodResolver(schema), defaultValues: { serviceType: 'lepas-kunci' } });
  const service = watch('serviceType');

  const onSubmit = (d: Data) => {
    const text = `Halo DriveEase Rentcar, saya ingin reservasi:\n\nNama: ${d.name}\nNo. HP: ${d.phone}\nLayanan: ${d.serviceType === 'lepas-kunci' ? 'Lepas kunci' : 'With driver'}\nMobil: ${d.carType}\nPickup: ${d.pickupLocation}\nTanggal: ${d.pickupDate} sampai ${d.returnDate}\n\nApakah unit tersedia? Terima kasih.`;
    const url = waLink(text);
    setSent(url);
    window.open(url, '_blank', 'noopener');
  };

  const err = (k: keyof Data) =>
    errors[k] ? <span className="err" id={`e-${k}`} role="alert">{errors[k]?.message as string}</span> : null;
  const inv = (k: keyof Data) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `e-${k}` : undefined });

  if (sent) {
    return (
      <div className="form">
        <div className="ok">
          <p className="lead strong" style={{ textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Pesan siap dikirim</p>
          <p className="body">Kami membuka WhatsApp dengan detail sewamu. Bila tidak terbuka, tekan tombol di bawah.</p>
          <a className="btn" href={sent} target="_blank" rel="noopener" style={{ justifySelf: 'start' }}>Buka WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 className="lead strong" style={{ textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>Isi data sewa</h3>

      <div>
        <span className="small strong" id="svc-l" style={{ display: 'block', marginBottom: 6 }}>Layanan</span>
        <div className="seg" role="group" aria-labelledby="svc-l">
          <button type="button" aria-pressed={service === 'lepas-kunci'} onClick={() => setValue('serviceType', 'lepas-kunci')}>Lepas kunci</button>
          <button type="button" aria-pressed={service === 'with-driver'} onClick={() => setValue('serviceType', 'with-driver')}>With driver</button>
        </div>
      </div>

      <div className="two">
        <label className="field-l">Lokasi pickup
          <select {...register('pickupLocation')} {...inv('pickupLocation')} defaultValue="">
            <option value="" disabled>Pilih cabang</option>
            {branchCities.map((b) => <option key={b}>{b}</option>)}
          </select>
          {err('pickupLocation')}
        </label>
        <label className="field-l">Mobil
          <select {...register('carType')} {...inv('carType')} defaultValue="">
            <option value="" disabled>Pilih mobil</option>
            {cars.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          {err('carType')}
        </label>
      </div>

      <div className="two">
        <label className="field-l">Tanggal pickup
          <input type="date" {...register('pickupDate')} {...inv('pickupDate')} />
          {err('pickupDate')}
        </label>
        <label className="field-l">Tanggal kembali
          <input type="date" {...register('returnDate')} {...inv('returnDate')} />
          {err('returnDate')}
        </label>
      </div>

      <div className="two">
        <label className="field-l">Nama
          <input type="text" autoComplete="name" {...register('name')} {...inv('name')} />
          {err('name')}
        </label>
        <label className="field-l">Nomor WhatsApp
          <input type="tel" autoComplete="tel" inputMode="tel" {...register('phone')} {...inv('phone')} />
          {err('phone')}
        </label>
      </div>

      <button type="submit" className="btn" style={{ justifySelf: 'start' }}>Lanjut ke WhatsApp</button>
    </form>
  );
}
