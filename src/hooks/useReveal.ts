import { useEffect } from 'react';

/**
 * Liga as animações de entrada conforme a rolagem.
 * Todo elemento com [data-reveal] recebe .is-in quando entra na tela (uma vez só).
 * Com "reduzir movimento" ligado, nada é escondido e nada anima.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    root.classList.add('reveal-on');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el));
    };
    observeAll();

    // Elementos montados depois (ex.: conteúdo que troca) também entram no observador
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove('reveal-on');
    };
  }, []);
}

export function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
