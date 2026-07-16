import { useId } from 'react';
import { useFloatingDropdown } from './useFloatingDropdown';
import { DropdownPanel } from './DropdownPanel';
import { COUNTRIES } from '../../lib/countries';
import styles from './Combobox.module.css';

type PhoneFieldProps = {
  ddiIso: string; // ISO do país do DDI seleccionado (para a bandeira)
  telefone: string;
  onDdiChange: (iso: string) => void;
  onTelefoneChange: (v: string) => void;
  error?: string;
};

/** Selector de DDI (bandeira + código) + número — porta combo-ddi/selectDDI. */
export function PhoneField({ ddiIso, telefone, onDdiChange, onTelefoneChange, error }: PhoneFieldProps) {
  const { open, pos, anchorRef, panelRef, toggle, close } = useFloatingDropdown();
  const labelId = useId();
  const selected = COUNTRIES.find((c) => c.iso === ddiIso) ?? COUNTRIES[0];

  return (
    <div className={styles.field + (open ? ` ${styles.open}` : '') + (error ? ` ${styles.error}` : '')} ref={anchorRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
      >
        <span className={`fi fi-${selected.iso.toLowerCase()} ${styles.flag}`} aria-hidden="true" />
        <span>{selected.ddi}</span>
      </button>
      <div className={styles.sep} />
      <input
        id="f-tel"
        type="tel"
        className={styles.input}
        placeholder="(11) 99999-9999"
        inputMode="numeric"
        maxLength={15}
        value={telefone}
        onChange={(e) => onTelefoneChange(e.target.value)}
      />

      <DropdownPanel open={open} pos={pos} panelRef={panelRef}>
        <div role="listbox" aria-labelledby={labelId}>
          {COUNTRIES.map((c) => (
            <div
              key={c.iso}
              role="option"
              aria-selected={c.iso === ddiIso}
              className={`${styles.option} ${c.iso === ddiIso ? styles.selected : ''}`}
              onClick={() => {
                onDdiChange(c.iso);
                close();
              }}
            >
              <span className={`fi fi-${c.iso.toLowerCase()} ${styles.flag}`} aria-hidden="true" />
              {c.ddi} {c.label}
            </div>
          ))}
        </div>
      </DropdownPanel>

      {error && <p className={styles.helper}>{error}</p>}
    </div>
  );
}
