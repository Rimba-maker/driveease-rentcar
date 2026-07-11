# Mobile UX: Bottom Bar & Reduced Scroll Length

## Problem

The DriveEase Rentcar landing page (Astro + React islands, Tailwind v4) is fully built per the original PRD across 14 sections. Desktop UX is fine. On mobile, the page feels too long to scroll for two reasons:

1. Every section uses uniform `py-24` (96px top+bottom) padding, which alone adds ~2000px+ of pure whitespace across 11 sections before content is even counted.
2. Card grids (Featured Cars, Why DriveEase USPs, Coverage branches) collapse to a single stacked column on mobile, turning what's a compact grid on desktop into a long vertical list.

Additionally, mobile navigation currently relies on a classic top hamburger menu, which the user wants replaced with a bottom action bar — a more app-like, thumb-friendly pattern common on mobile.

## Scope

Mobile-only (`<md` breakpoint, 768px). Desktop layout, spacing, and grids are unchanged.

## 1. Mobile Bottom Bar

New component: `src/components/MobileBottomBar.astro`, imported into `Layout.astro` alongside `Navbar` and `Footer`. Rendered only on mobile (`md:hidden`), `fixed bottom-0`, 5 quick-action icons:

| Icon | Action |
|---|---|
| Home | Scroll to top |
| Mobil (Car) | Jump to `#armada` |
| Booking | Center, visually elevated (larger, primary color, raised above the bar) — jump to `#booking` |
| WA (MessageCircle) | Open `https://wa.me/628110000000` directly (same number already used in `BookingForm.tsx`) |
| Menu | Opens the existing mobile nav overlay in `Navbar.astro` |

**Reuse, not duplicate:** the "Menu" button does not reimplement the slide-up overlay. It programmatically clicks the existing `#mobile-menu-btn` in `Navbar.astro`, reusing its current toggle logic, animation, and links (Mobil, Layanan, Cabang, Corporate) as-is.

**Navbar changes:** on mobile, the top bar shows the logo only. The existing hamburger button stays in the DOM (so the current toggle script keeps working) but is visually hidden (`hidden` instead of `md:hidden`), since the bottom bar's Menu button now drives it.

**Layout changes:** `<main>` gets `pb-20 md:pb-0` so the fixed bottom bar never overlaps page content or the footer. Bottom bar height accounts for `env(safe-area-inset-bottom)` for iOS devices with a home indicator.

**Deferred:** active-state highlighting of the current section (would require an `IntersectionObserver`) is not included in this pass — add later if it proves necessary.

## 2. Horizontal Swipe Carousels

Applied to three sections identified as the longest stacks on mobile:

- `FleetShowcase.tsx` (car grid, up to 8+ cards)
- `WhyDriveEase.tsx` (6 USP cards)
- `CoverageArea.tsx` (9 branch rows)

**Approach:** native CSS scroll-snap, no new dependency. Container switches from `flex overflow-x-auto snap-x snap-mandatory` on mobile to the existing `md:grid md:grid-cols-*` on desktop (unchanged desktop behavior). Cards get `snap-start shrink-0` with a mobile width of roughly 80% of viewport, deliberately leaving the next card peeking in from the edge as a visual affordance that the row is swipeable.

Scrollbar is hidden via one small reusable utility class added to `global.css`:

```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

`RentalOptions.tsx` (only 2 cards) and `Testimonial.tsx` (already a single-item carousel) are left unchanged.

## 3. Reduced Vertical Section Padding

All section components currently using `py-24` (Hero in `index.astro`, `FleetShowcase`, `RentalOptions`, `WhyDriveEase`, `HowItWorks`, `MonthlyRental`, `CorporateSolution`, `CoverageArea`, `Testimonial`, `FAQ`, `BookingForm`) change to a responsive scale:

```
py-14 sm:py-20 md:py-24
```

Desktop (`md:` and up) renders identically to today. Mobile padding drops from 96px to 56px per section edge, compounding to a meaningful reduction in total page height across 11 sections.

## Testing

Manual verification at mobile viewport widths (375px, 390px):

- Bottom bar renders correctly, doesn't overlap the booking form or footer, WA/Booking/Menu actions work.
- Swipe carousels scroll and snap correctly in Fleet, Why DriveEase, and Coverage sections; desktop grids are visually unchanged.
- `astro check && astro build` still passes.
