import { useEffect } from 'react';

/**
 * Rolagem suave com inércia para mouse e trackpad (estilo "Lenis"), sem dependências.
 * - Só atua na roda do mouse/trackpad; toque no celular e teclado seguem nativos.
 * - Desligada com "reduzir movimento" e em telas só de toque.
 * - Respeita elementos com rolagem própria e modais abertos (body com overflow hidden).
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const soToque = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (reduz || soToque) return;

    const html = document.documentElement;
    const comportamentoAnterior = html.style.scrollBehavior;
    // A rolagem "smooth" do CSS brigaria com a nossa animação quadro a quadro
    html.style.scrollBehavior = 'auto';

    let alvo = window.scrollY;
    let atual = window.scrollY;
    let animando = false;
    let ultimo = 0;
    let raf = 0;

    const maximo = () => html.scrollHeight - window.innerHeight;
    const limita = (v: number) => Math.min(maximo(), Math.max(0, v));

    // Se o cursor está sobre algo que rola sozinho, deixa o navegador cuidar
    const temRolagemPropria = (el: EventTarget | null, dy: number) => {
      let n = el instanceof Element ? el : null;
      while (n && n !== document.body && n !== html) {
        const st = getComputedStyle(n);
        if (/(auto|scroll)/.test(st.overflowY) && n.scrollHeight > n.clientHeight) {
          if ((dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight) || (dy < 0 && n.scrollTop > 0)) return true;
        }
        n = n.parentElement;
      }
      return false;
    };

    const passo = (agora: number) => {
      const dt = ultimo ? Math.min(64, agora - ultimo) : 16.7;
      ultimo = agora;
      // Interpolação independente da taxa de quadros (mesma sensação em 60 Hz e 120 Hz)
      const k = 1 - Math.pow(1 - 0.12, dt / 16.7);
      atual += (alvo - atual) * k;
      if (Math.abs(alvo - atual) < 0.4) {
        atual = alvo;
        animando = false;
      }
      window.scrollTo(0, atual);
      if (animando) raf = requestAnimationFrame(passo);
      else ultimo = 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return; // zoom com Ctrl + roda
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // gesto horizontal
      if (document.body.style.overflow === 'hidden') return; // modal aberto
      if (temRolagemPropria(e.target, e.deltaY)) return;

      e.preventDefault();
      const fator = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!animando) alvo = atual = window.scrollY;
      alvo = limita(alvo + e.deltaY * fator);
      if (!animando) {
        animando = true;
        raf = requestAnimationFrame(passo);
      }
    };

    // Teclado, barra de rolagem, links e scrollTo programático: sincroniza a posição
    const onScroll = () => {
      if (!animando) alvo = atual = window.scrollY;
    };

    // Clique em botões que rolam a página (ex.: logo, navegação das modalidades) interrompe a inércia
    const interrompe = () => {
      if (animando) {
        cancelAnimationFrame(raf);
        animando = false;
        ultimo = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', interrompe, { passive: true });
    window.addEventListener('keydown', interrompe);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', interrompe);
      window.removeEventListener('keydown', interrompe);
      html.style.scrollBehavior = comportamentoAnterior;
    };
  }, []);
}
