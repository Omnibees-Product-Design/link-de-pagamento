import type { ReactNode, Ref } from 'react';
import { createPortal } from 'react-dom';
import type { DropdownPos } from './useFloatingDropdown';
import styles from './Combobox.module.css';

type DropdownPanelProps = {
  open: boolean;
  pos: DropdownPos | null;
  panelRef: Ref<HTMLDivElement>;
  children: ReactNode;
};

/**
 * Painel flutuante `position:fixed`, partilhado por todos os campos combo —
 * renderizado via portal para `document.body`. O painel direito (`.glass-card`)
 * usa `backdrop-filter`, que (tal como `transform`/`filter`) cria um novo
 * containing block para descendentes `position:fixed` — sem portal, o painel
 * calculava a posição em coordenadas de viewport mas era desenhado relativo ao
 * `.glass-card`, ficando ~700px deslocado. Portal para `<body>` evita o problema
 * por completo (mesmo padrão já usado no CVVField/tooltip).
 */
export function DropdownPanel({ open, pos, panelRef, children }: DropdownPanelProps) {
  if (!open || !pos || typeof document === 'undefined') return null;
  return createPortal(
    <div
      ref={panelRef}
      className={styles.panel}
      style={{ left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom }}
    >
      {children}
    </div>,
    document.body
  );
}
