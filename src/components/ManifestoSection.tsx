import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Frase do manifesto que "acende" palavra por palavra conforme a rolagem.
 * As palavras-chave ganham uma marcação em lima que varre da esquerda para a direita.
 */
const TRECHOS: { texto: string; destaque?: boolean }[] = [
  { texto: 'A plataforma gaúcha de mobilidade urbana que conecta motoristas e passageiros com' },
  { texto: 'transparência', destaque: true },
  { texto: ',' },
  { texto: 'tecnologia', destaque: true },
  { texto: 'e' },
  { texto: 'respeito à nossa cidade', destaque: true },
  { texto: '.' },
];

export const ManifestoSection: React.FC = () => {
  const textoRef = useRef<HTMLParagraphElement>(null);
  const [acesas, setAcesas] = useState(0);

  // Quebra em palavras, guardando a qual trecho cada uma pertence
  const { palavras, grupos } = useMemo(() => {
    const palavras: { texto: string; grupo: number; colado: boolean }[] = [];
    TRECHOS.forEach((t, g) => {
      const pontuacao = /^[,.]$/.test(t.texto);
      t.texto.split(' ').forEach((p) => palavras.push({ texto: p, grupo: g, colado: pontuacao }));
    });
    const grupos = TRECHOS.map((_, g) => {
      const idx = palavras.map((p, i) => (p.grupo === g ? i : -1)).filter((i) => i >= 0);
      return { ultimo: Math.max(...idx) };
    });
    return { palavras, grupos };
  }, []);

  const total = palavras.length;

  useEffect(() => {
    const el = textoRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAcesas(total);
      return;
    }

    let ticking = false;
    const atualiza = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Começa quando o topo do texto chega a 85% da tela; termina quando a base passa de 55%
      const inicio = vh * 0.85;
      const fim = vh * 0.55;
      const percorrido = inicio - r.top;
      const distancia = inicio - fim + r.height;
      const progresso = Math.min(1, Math.max(0, percorrido / distancia));
      setAcesas(Math.round(progresso * total));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(atualiza);
      }
    };
    atualiza();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [total]);

  // Monta os trechos com as palavras, agrupando as palavras-chave para a marcação
  let cursor = 0;
  const conteudo = TRECHOS.map((t, g) => {
    const doGrupo = palavras.filter((p) => p.grupo === g);
    const inicio = cursor;
    cursor += doGrupo.length;
    const espaco = g > 0 && !doGrupo[0].colado ? ' ' : '';

    const spans = doGrupo.map((p, k) => {
      const i = inicio + k;
      return (
        <React.Fragment key={i}>
          {k > 0 ? ' ' : ''}
          <span className={`palavra ${i < acesas ? 'acesa' : ''}`}>{p.texto}</span>
        </React.Fragment>
      );
    });

    if (!t.destaque) return <React.Fragment key={g}>{espaco}{spans}</React.Fragment>;
    const marcado = acesas > grupos[g].ultimo;
    return (
      <React.Fragment key={g}>
        {espaco}
        <span className={`marca-texto ${marcado ? 'marcado' : ''}`}>{spans}</span>
      </React.Fragment>
    );
  });

  return (
    <section id="manifesto" className="relative w-full bg-papel text-erva">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-44">
        <p
          ref={textoRef}
          className="manifesto titulo text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[1.15] max-w-[24ch] lg:ml-[16.66%]"
        >
          {conteudo}
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
