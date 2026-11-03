// Open-source motion stack: GSAP + ScrollTrigger (scenes, counters, parallax) and Lenis (weighted wheel).
// Every scene has a finished composition for no-script, reduced motion and phones set to "rest" (see stage.css).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/* eslint-disable @typescript-eslint/no-explicit-any */
const w = window as any;
w.gsap = gsap;
w.ScrollTrigger = ScrollTrigger;
w.Lenis = Lenis;

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function loadStage(): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/scenes/stage.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('stage.js failed to load'));
    document.head.appendChild(s);
  });
}

function registerScenes() {
  const { Stage, Scenes } = w;

  // The lot, seen from above. One unit grows from a window in it to the whole screen.
  Scenes['lot-unit'] = (root: HTMLElement, opts: { hold?: number } = {}) =>
    Stage.scene(root, {
      hold: opts.hold ?? 2.2,
      scrub: Stage.lenis ? true : 0.6,
      phone: { hold: 1.6 },
      build(tl: gsap.core.Timeline, { q }: { q: (s: string) => HTMLElement[] }) {
        tl.fromTo(q('.lot img'), { scale: 1 }, { scale: 1.18, transformOrigin: '62% 44%', duration: 1 }, 0)
          .fromTo(q('.unit'), { scale: 0.12 }, { scale: 1, transformOrigin: '62% 44%', ease: 'power2.inOut', duration: 0.78 }, 0.04)
          .fromTo(q('.unit-tag'), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 12, duration: 0.14 }, 0.12)
          .fromTo(q('.unit-card'), { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0)
          .fromTo(q('.unit-card .lead, .unit-card .btn'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.14 }, 0.74);
      },
    });

  // Four steps, ordered by size: each tile grows from its baseline as the scroll reaches it.
  Scenes['steps-grow'] = (root: HTMLElement, opts: { hold?: number } = {}) =>
    Stage.scene(root, {
      hold: opts.hold ?? 2,
      scrub: Stage.lenis ? true : 0.5,
      phone: 'rest',
      build(tl: gsap.core.Timeline, { q }: { q: (s: string) => HTMLElement[] }) {
        q('.gt').forEach((tile, i) => {
          const at = 0.04 + i * 0.22;
          tl.fromTo(tile, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.24 }, at)
            .fromTo(tile.children, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.14 }, at + 0.1);
        });
      },
    });
}

function counters() {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: end,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = Math.round(state.v) + suffix),
        }),
    });
  });
}

function heroDrift() {
  if (reduced) return;
  const speeds: Record<string, number> = { c0: -5, c1: -9, c2: -3, c3: -11, c4: -6, c5: -8 };
  Object.entries(speeds).forEach(([cls, y]) => {
    gsap.to(`.sheet-col.${cls}`, {
      yPercent: y,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

(async () => {
  try {
    await loadStage();
    const { Stage } = w;
    registerScenes();
    Stage.smooth();
    Stage.init();
    counters();
    heroDrift();
    await Stage.ready();
  } catch (err) {
    // Without the stage every section already shows its finished composition.
    console.warn(err);
  }
})();
