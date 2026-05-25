# PRD: DriveEase Rentcar — Rental Mobil Harian & Bulanan

## 1. Brand Identity

**Nama Brand:** DriveEase Rentcar
**Alasan Naming:** "Drive" + "Ease" = mengemudi dengan mudah. Langsung menyampaikan core value: rental tanpa ribet, proses gampang, harga jelas. Modern, gampang dieja, professional.

**Tagline:** *"Rental Mudah, Mobil Siap, Perjalanan Lancar."*

**Target Audience:**
- Business traveler (rental harian, drive-self atau with driver)
- Wisatawan domestik & expatriate
- Pengguna mobil bulanan (work assignment, relocation)
- Corporate fleet untuk operasional
- Wedding & event organizer

**Brand Voice:**
- Tone: Profesional, terpercaya, efisien, no-nonsense
- Style copywriting: Clear & informative, fokus benefit & transparency
- Avoid: Overpromise, jargon teknis berlebihan

---

## 2. Tech Stack

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript (strict)
- **Animation:** Framer Motion via React islands
- **Deploy:** Netlify (static)
- **Images:** Unsplash + Pexels

---

## 3. Section Breakdown

| # | Section | Type | Tujuan |
|---|---------|------|--------|
| 1 | Navbar | `.astro` static | Logo, nav, CTA "Cek Ketersediaan" |
| 2 | Hero | React island `client:load` | Hero + quick booking search bar |
| 3 | Fleet Categories | React island `client:visible` | MPV, SUV, Sedan, Premium, Bus |
| 4 | Featured Cars | React island `client:visible` | Card mobil populer dengan price |
| 5 | Rental Options | React island `client:visible` | Lepas Kunci vs With Driver |
| 6 | Why DriveEase | React island `client:visible` | USP cards |
| 7 | How It Works | `.astro` static | 4 step booking |
| 8 | Monthly Rental | `.astro` static | Khusus paket bulanan |
| 9 | Corporate Solution | `.astro` static | B2B fleet management |
| 10 | Coverage Area | React island `client:visible` | Map cabang & jangkauan |
| 11 | Testimonial | React island `client:visible` | Review klien |
| 12 | FAQ | React island `client:visible` | Pertanyaan umum |
| 13 | Booking CTA | React island `client:idle` | Form booking lengkap |
| 14 | Footer | `.astro` static | Kontak, sertifikasi, partner |

---

## 4. Copywriting (Bahasa Indonesia)

### Navbar
- Menu: Mobil • Layanan • Harga • Cabang • Corporate
- CTA: **Cek Ketersediaan**

### Hero
- **Headline:** Rental Mobil Yang Bisa Diandalkan.
- **Subheadline:** 200+ unit mobil terawat, dari MPV keluarga sampai sedan eksekutif. Lepas kunci atau with driver, harian sampai bulanan.
- **CTA Primary:** Cek Mobil
- **CTA Secondary:** Booking Cepat

Inline search bar:
- Lokasi pickup • Tanggal pickup • Tanggal return • Tipe mobil → **Cari**

Trust badges: "5.000+ Klien Aktif" • "Mobil Maks. 3 Tahun" • "Asuransi All Risk"

### Fleet Categories
- **Heading:** Pilih Mobil Sesuai Kebutuhan
- 5 category cards dengan icon:
  - 🚗 **City Car** — Brio, Agya, Ayla (Rp 250k/hari)
  - 🚙 **MPV** — Avanza, Xenia, Mobilio (Rp 350k/hari)
  - 🛻 **SUV** — Innova Reborn, Fortuner, Pajero (Rp 550k/hari)
  - 🚘 **Sedan / Executive** — Camry, Accord, BMW 3-Series (Rp 850k/hari)
  - 🚌 **Bus & Hiace** — Hiace, Bus 30-50 seat (Konsultasi)

### Featured Cars
- **Heading:** Mobil Terpopuler Bulan Ini
- Grid 6-8 mobil card:
  - **Toyota Avanza 2023** — Rp 350k/hari | 7 seater | Manual/Matic
  - **Toyota Innova Reborn V** — Rp 550k/hari | 8 seater | Matic
  - **Honda Brio Satya** — Rp 280k/hari | 5 seater | Matic
  - **Toyota Fortuner VRZ** — Rp 750k/hari | 7 seater | Matic
  - **Daihatsu Xenia 2023** — Rp 330k/hari | 7 seater | Manual
  - **Toyota Camry 2.5G** — Rp 950k/hari | 5 seater | Matic
  - **Mitsubishi Pajero Sport** — Rp 800k/hari | 7 seater | Matic
  - **Toyota Hiace Premio** — Rp 1.2jt/hari | 16 seater | Manual

Per card: Foto • Nama • Harga/hari • Spec (penumpang, transmisi, BBM) • CTA "Sewa"

### Rental Options
- **Heading:** Lepas Kunci atau With Driver?
- 2 cards comparison:

**🔑 Lepas Kunci (Self-Drive)**
- Harga lebih hemat
- Bebas atur waktu & rute
- Wajib SIM A, KTP, deposit
- Min booking: 12 jam
- *Mulai dari Rp 250k/hari*

**👨‍✈️ With Driver**
- Driver berpengalaman & ber-SIM A umum
- Lebih santai, fokus liburan/meeting
- Termasuk gaji & makan driver
- Min booking: 8 jam
- *Mulai dari Rp 400k/hari + driver Rp 175k*

### Why DriveEase
- **Heading:** Kenapa Pilih DriveEase
- 6 USP cards:
  1. **🚗 Armada Maks. 3 Tahun** — Mobil masih segar, jarang trouble
  2. **🛡️ Asuransi All Risk** — Tenang bawa, kami yang tanggung
  3. **🔧 Service Rutin Berkala** — Setiap 5.000 km, oli & filter selalu fresh
  4. **🕐 24/7 Roadside Assistance** — Mogok di mana pun, kami datang
  5. **💳 Transparan, No Hidden Fee** — Harga di awal, ya itu yang dibayar
  6. **📱 Booking Online Cepat** — 5 menit selesai, no telpon-telpon ribet

### How It Works
- **Heading:** Sewa Mobil dalam 4 Langkah
- Timeline:
  1. **🔍 Pilih Mobil** — Browse online, cek harga & spec
  2. **📅 Booking** — Isi form, upload SIM & KTP, bayar DP 30%
  3. **🤝 Pickup** — Datang ke cabang atau request delivery
  4. **🚗 Drive & Return** — Nikmati perjalanan, return di waktu yang disepakati

### Monthly Rental
- **Heading:** Paket Bulanan Hemat Sampai 40%
- **Body:** Cocok untuk penugasan kerja, expatriate, atau yang lagi service mobil pribadi panjang.
- Pricing comparison:
  - **Harian:** Rp 350k × 30 = Rp 10.5jt
  - **Monthly:** **Rp 6.5jt - 7jt** (hemat 35-40%)
- Termasuk: Asuransi all risk, service rutin, ganti unit jika trouble, driver tersedia
- **CTA:** Konsultasi Paket Monthly

### Corporate Solution
- **Heading:** Fleet Solution Untuk Bisnismu
- **Body:** Kami suplai mobil operasional untuk 50+ perusahaan di Indonesia. Long-term contract dengan harga khusus, dedicated account manager, dan custom reporting.
- 3 cards:
  - 📊 Fleet Management Dashboard
  - 🤝 Dedicated Account Manager
  - 💼 Invoice Tax-Compliant
- **CTA:** Diskusi Corporate Plan

### Coverage Area
- **Heading:** Cabang Kami
- 8 cabang di:
  - Jakarta (Soekarno-Hatta Airport, Kemayoran, TB Simatupang)
  - Bandung, Surabaya, Yogyakarta, Bali (Ngurah Rai Airport, Kuta), Medan
- Map embed dengan pin lokasi cabang
- **Delivery service:** Antar mobil ke hotel/rumah di area cabang

### Testimonial
- **Heading:** Cerita Klien Kami
- 4 testimonial:
  - "Pakai monthly buat assignment 3 bulan di Surabaya. Sigap, responsif, mobil bagus." — *Bayu, Project Manager*
  - "Liburan keluarga ke Bali, ambil Innova with driver. Driver-nya ramah, hafal jalan." — *Keluarga Wijaya*
  - "Corporate fleet 15 unit untuk operational, sudah 2 tahun no issue." — *PT Maju Bersama*
  - "Reschedule mendadak, admin oke banget bantu. Fleksibel!" — *Andini, Solo traveler*

### FAQ
- **Heading:** FAQ
Accordion:
1. Syarat sewa lepas kunci apa saja? → SIM A aktif, KTP, deposit Rp 1-3jt sesuai mobil
2. Bisa antar jemput di bandara? → Bisa! Tambahan Rp 100k untuk delivery dalam kota
3. Bagaimana jika mobil mengalami kerusakan? → All risk insurance covered, deductible Rp 500k
4. Bisa keluar kota? → Bisa, ada biaya per km di atas jarak free (300km/hari)
5. Pembayaran apa saja yang diterima? → Transfer bank, kartu kredit, QRIS, GoPay, OVO
6. Bisa request mobil yang tidak ada di website? → Bisa, hubungi kami untuk konsultasi

### Booking CTA
- **Heading:** Booking Sekarang, Mobil Siap Esok
- Form lengkap: Lokasi • Tanggal • Tipe • Lepas kunci/with driver • Kontak
- **CTA:** Lanjut ke Pembayaran

### Footer
- Tagline: *"Mobilmu, kemanapun tujuanmu."*
- Sertifikasi: NIB, IUP, asuransi partner (Sinarmas, Astra)
- Sosmed: IG, TikTok, YouTube (review mobil)
- 24/7 hotline: WA & telepon

---

## 5. Image References

| Section | Source | URL / Search Term | Alt Text | Dimensi |
|---------|--------|-------------------|----------|---------|
| Hero | Unsplash | https://unsplash.com/s/photos/car-rental-keys | "Mobil rental dengan kunci" | 1920x1080 |
| Hero alt | Pexels | https://www.pexels.com/search/car%20fleet%20parking/ | "Fleet mobil rental" | 1920x1080 |
| City Car | Unsplash | https://unsplash.com/s/photos/honda-brio | "Honda Brio city car" | 800x600 |
| MPV | Pexels | https://www.pexels.com/search/toyota%20avanza/ | "Toyota Avanza MPV" | 800x600 |
| SUV | Unsplash | https://unsplash.com/s/photos/toyota-fortuner | "Toyota Fortuner SUV" | 800x600 |
| Sedan | Unsplash | https://unsplash.com/s/photos/toyota-camry | "Toyota Camry sedan executive" | 800x600 |
| Hiace | Pexels | https://www.pexels.com/search/toyota%20hiace%20van/ | "Toyota Hiace travel" | 800x600 |
| Featured Avanza | Pexels | https://www.pexels.com/search/avanza%20car/ | "Avanza terbaru" | 800x600 |
| Featured Innova | Unsplash | https://unsplash.com/s/photos/toyota-innova | "Innova Reborn" | 800x600 |
| Self-drive | Unsplash | https://unsplash.com/s/photos/man-driving-car | "Self drive rental" | 800x600 |
| With driver | Pexels | https://www.pexels.com/search/professional%20driver%20car/ | "Driver profesional rental" | 800x600 |
| Why - Service | Unsplash | https://unsplash.com/s/photos/car-service-mechanic | "Service mobil rutin" | 800x600 |
| Why - Insurance | Pexels | https://www.pexels.com/search/car%20insurance%20document/ | "Asuransi all risk" | 800x600 |
| How it works - keys | Unsplash | https://unsplash.com/s/photos/car-key-handover | "Handover kunci rental" | 800x600 |
| Monthly rental | Pexels | https://www.pexels.com/search/business%20travel%20car/ | "Long term rental" | 1200x800 |
| Corporate | Unsplash | https://unsplash.com/s/photos/corporate-fleet | "Corporate fleet mobil" | 1200x800 |
| Coverage map | Pexels | https://www.pexels.com/search/indonesia%20map%20travel/ | "Cabang Indonesia" | 1200x800 |

---

## 6. Animation Spec (Framer Motion)

### Hero (React island, `client:load`)
```tsx
// Headline reveal stagger
const heroReveal = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, staggerChildren: 0.12 }
  }
}

// Search bar slide-in from below after headline
const searchBarReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
  }
}
```

### Fleet Categories (React island, `client:visible`)
- 5 cards reveal stagger
- Icon scale pop on visible: `scale: [0, 1.15, 1]`, spring
- Hover: card lift + icon rotate slight `rotate: 5`
- Active filter: persistent highlight state

### Featured Cars Grid (React island, `client:visible`)
- Stagger reveal grid
- Car card hover: image zoom slight, info slide-up overlay
- Filter by category: `AnimatePresence` + `layout` smooth reflow
- Price tag: subtle glow on hover

### Rental Options (React island, `client:visible`)
- 2 cards side-by-side reveal from opposite directions
- Card hover: scale `1.02`, border glow
- Comparison checkmarks: stagger reveal

### Why DriveEase (React island, `client:visible`)
- 6 USP cards alternating reveal (left, right, left, right...)
- Icon animation: bounce on enter, slight rotate
- Hover: card lift + icon pulse

### How It Works Timeline (`.astro` + small island)
- Horizontal timeline desktop, vertical mobile
- Step numbers reveal stagger
- Connecting line draw via SVG `pathLength`

### Coverage Area Map (React island, `client:visible`)
- Map pin animation: drop-in from above
- Active branch: pulse ring effect
- Hover branch: tooltip with detail info

### Testimonial Carousel (React island, `client:visible`)
- Auto-rotate 6s with pause on hover
- Slide transition direction-aware
- Star rating: sequential fill animation

### FAQ Accordion (React island, `client:visible`)
- Height animation via `layout` prop
- Chevron rotate 180deg
- Smooth content reveal

### Booking Form
- Multi-step form smooth transition between steps
- Progress bar fill animation
- Date picker: dropdown slide-in animation
- Submit button: loading state animation

### Scroll Reveal Pattern (reusable)
```tsx
const efficientFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.65, ease: "easeOut" } 
  }
}
```

### Hydration Strategy
- `client:load` → Hero + search bar
- `client:visible` → Fleet, Featured, Options, Why Us, Coverage, Testimonial, FAQ
- `client:idle` → Booking form
- Sisanya: static

---

## 7. SEO Meta

- **Title:** DriveEase Rentcar — Rental Mobil Harian & Bulanan Indonesia
- **Description:** Rental mobil terpercaya, 200+ unit dari city car sampai executive sedan. Lepas kunci atau with driver. Harian, mingguan, bulanan. 8 cabang Indonesia.
- **Keywords:** rental mobil jakarta, sewa mobil harian, rental mobil bulanan, sewa innova, lepas kunci jakarta, rental mobil bandung
- **OG Image:** Hero shot mobil rental dengan logo overlay (1200x630)
- **Schema:** `AutoRental` + `Service` schema
