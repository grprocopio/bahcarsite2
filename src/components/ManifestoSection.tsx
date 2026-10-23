import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Manifesto "preso" na tela: a seção fica parada enquanto a pessoa rola e a frase
 * vai aparecendo palavra por palavra. Quando a frase termina, a página volta a descer.
 * Só "nossa cidade" ganha o marca-texto lima, no final.
 */
const TRECHOS: { texto: string; destaque?: boolean }[] = [
  { texto: 'A plataforma gaúcha de mobilidade urbana que conecta motoristas e passageiros com transparência, tecnologia e respeito à' },
  { texto: 'nossa cidade', destaque: true },
  { texto: '.' },
];

// Fração da rolagem usada para acender as palavras; o resto segura a frase completa antes de soltar
const FRACAO_PALAVRAS = 0.8;

export const ManifestoSection: React.FC = () => {
  const secaoRef = useRef<HTMLElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [reduz, setReduz] = useState(false);

  const palavras = useMemo(() => {
    const lista: { texto: string; grupo: number; colado: boolean }[] = [];
    TRECHOS.forEach((t, g) => {
      const pontuacao = /^[,.]$/.test(t.texto);
      t.texto.split(' ').forEach((p) => lista.push({ texto: p, grupo: g, colado: pontuacao }));
    });
    return lista;
  }, []);

  const total = palavras.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduz(true);
      setProgresso(1);
      return;
    }
    const secao = secaoRef.current;
    if (!secao) return;

    let ticking = false;
    const atualiza = () => {
      ticking = false;
      const r = secao.getBoundingClientRect();
      const percurso = secao.offsetHeight - window.innerHeight;
      const p = percurso > 0 ? -r.top / percurso : 1;
      setProgresso(Math.min(1, Math.max(0, p)));
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
  }, []);

  const acesas = Math.round(Math.min(1, progresso / FRACAO_PALAVRAS) * total);

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
    const marcado = acesas >= inicio + doGrupo.length;
    return (
      <React.Fragment key={g}>
        {espaco}
        <span className={`marca-texto ${marcado ? 'marcado' : ''}`}>{spans}</span>
      </React.Fragment>
    );
  });

  return (
    <section
      ref={secaoRef}
      id="manifesto"
      className={`relative w-full bg-papel text-erva ${reduz ? '' : 'h-[260vh] sm:h-[240vh]'}`}
    >
      <div className={`${reduz ? '' : 'sticky top-0 h-[100svh]'} flex items-center`}>
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24">
          <div className="w-fit lg:ml-[16.66%]">
          <p className="manifesto titulo text-[clamp(2rem,4.6vw,4rem)] leading-[1.12] max-w-[24ch]">
            {conteudo}
          </p>

          {/* Barra de progresso discreta da leitura */}
          {!reduz && (
            <div className="mt-10 sm:mt-14 h-[3px] w-full bg-erva/10 rounded-full overflow-hidden" aria-hidden="true">
              <div className="h-full bg-erva origin-left" style={{ transform: `scaleX(${Math.min(1, progresso / FRACAO_PALAVRAS)})` }} />
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
