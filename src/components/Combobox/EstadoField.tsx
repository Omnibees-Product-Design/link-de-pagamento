import { useId } from 'react';
import { useFloatingDropdown } from './useFloatingDropdown';
import { DropdownPanel } from './DropdownPanel';
import styles from './Combobox.module.css';

const ESTADOS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT',
  'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
];

type EstadoFieldProps = {
  value: string;
  onChange: (uf: string) => void;
  error?: string;
};

/** Selector de Estado (UF) — lista fixa, sem pesquisa. Porta toggleEstado/selectEstado. */
export function EstadoField({ value, onChange, error }: EstadoFieldProps) {
  const { open, pos, anchorRef, panelRef, toggle, close } = useFloatingDropdown();
  const labelId = useId();

  return (
    <div id="estado-combo" className={styles.field + (open ? ` ${styles.open}` : '') + (error ? ` ${styles.error}` : '')} ref={anchorRef}>
      <button
        type="button"
        className={`${styles.trigger} ${styles.triggerFlex}`}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
      >
        <span style={{ color: value ? undefined : 'var(--color-gray-500)' }}>{value || 'Selecione'}</span>
      </button>

      <DropdownPanel open={open} pos={pos} panelRef={panelRef}>
        <div role="listbox" aria-labelledby={labelId}>
          {ESTADOS.map((uf) => (
            <div
              key={uf}
              role="option"
              aria-selected={uf === value}
              className={`${styles.option} ${uf === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(uf);
                close();
              }}
            >
              {uf}
            </div>
          ))}
        </div>
      </DropdownPanel>

      {error && <p className={styles.helper}>{error}</p>}
    </div>
  );
}
