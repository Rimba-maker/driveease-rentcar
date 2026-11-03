import { useEffect, useId, useRef, useState } from 'react';
import { DayPicker, type DateRange as Range } from 'react-day-picker';
import { id as idLocale } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { daysBetween } from '../../lib/pricing';

interface Props {
  value: Range | undefined;
  onChange: (r: Range | undefined) => void;
  invalid?: boolean;
  describedBy?: string;
}

const fmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' });

export default function DateRange({ value, onChange, invalid, describedBy }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  // Close on outside click and on Escape (floating panel, so it may carry a shadow).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label =
    value?.from && value?.to
      ? `${fmt.format(value.from)} – ${fmt.format(value.to)} · ${daysBetween(value.from, value.to)} hari`
      : value?.from
        ? `${fmt.format(value.from)} – pilih tanggal kembali`
        : 'Pilih tanggal pickup dan kembali';

  return (
    <div className="daterange" ref={wrap}>
      <button
        type="button"
        className="date-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </button>
      {open && (
        <div id={panelId} className="date-panel" role="dialog" aria-label="Pilih tanggal sewa">
          <DayPicker
            mode="range"
            locale={idLocale}
            selected={value}
            onSelect={(r) => {
              onChange(r);
              if (r?.from && r?.to && r.to.getTime() !== r.from.getTime()) setOpen(false);
            }}
            disabled={{ before: today }}
            numberOfMonths={typeof window !== 'undefined' && window.innerWidth >= 900 ? 2 : 1}
            weekStartsOn={1}
          />
        </div>
      )}
    </div>
  );
}
