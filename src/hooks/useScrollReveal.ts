import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  const {
    y = 25,
    x = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children.length > 0 && stagger > 0 ? el.children : el;

    gsap.set(children, { opacity: 0, y, x });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [y, x, duration, delay, stagger, start, ease]);

  return ref;
}
