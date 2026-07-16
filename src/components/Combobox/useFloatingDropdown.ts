import { useCallback, useEffect, useRef, useState } from 'react';

export type DropdownPos = { left: number; width: number; top?: number; bottom?: number };

/**
 * Estado + posicionamento partilhado por todos os campos "combo" (País, DDI,
 * Documento, Estado, Parcelamento). Porta positionComboDropdown/closeAllCombos
 * (prototypes/v3.html) para React: painel `position:fixed` calculado a partir
 * do "anchor" (o trigger), abre para cima quando não há espaço abaixo, fecha
 * ao clicar fora, Esc, scroll ou resize.
 */
export function useFloatingDropdown() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<DropdownPos | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const computePos = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const up = spaceBelow < 140;
    setPos({
      left: r.left,
      width: r.width,
      top: up ? undefined : r.bottom + 4,
      bottom: up ? window.innerHeight - r.top + 4 : undefined,
    });
  }, []);

  const openDropdown = useCallback(() => {
    computePos();
    setOpen(true);
  }, [computePos]);

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => {
    if (open) close();
    else openDropdown();
  }, [open, close, openDropdown]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (anchorRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      close();
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    // Só fecha no scroll da página POR TRÁS do painel — scroll dentro do
    // próprio painel (lista longa) não deve fechar.
    function onScroll(e: Event) {
      if (panelRef.current?.contains(e.target as Node)) return;
      close();
    }
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', close);
    };
  }, [open, close]);

  return { open, pos, anchorRef, panelRef, openDropdown, close, toggle };
}
