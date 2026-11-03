// Entrance choreography: parts of each section arrive in reading order, once.
// Content stays visible if this script never runs (see html.js .reveal in global.css).
const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduced || !('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px 12% 0px', threshold: 0 },
  );
  items.forEach((el) => io.observe(el));
}

// Headroom navbar: tucks away while reading down, returns on the way up.
const nav = document.querySelector<HTMLElement>('.nav');
const mbar = document.querySelector<HTMLElement>('.mbar');
if (nav) {
  let last = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      const down = y > last && y > 160;
      nav.classList.toggle('is-hidden', down);
      mbar?.classList.toggle('is-hidden', down);
      last = y;
    },
    { passive: true },
  );
}

// Moving pictures: muted loops play only when visible, and stay on the poster under reduced motion.
const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[autoplay]'));
if (reduced) {
  videos.forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
} else if ('IntersectionObserver' in window) {
  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }
  }, { threshold: 0.15 });
  videos.forEach((v) => vio.observe(v));
}
