import { useId } from 'react';
import { useFloatingDropdown } from './useFloatingDropdown';
import { DropdownPanel } from './DropdownPanel';
import { DOC_PLACEHOLDER, maskDocNumber } from '../../lib/masks';
import styles from './Combobox.module.css';

const DOC_TYPES = ['CPF', 'RG', 'Passaporte', 'CNH'];

type DocumentFieldProps = {
  doctype: string;
  docnum: string;
  onDoctypeChange: (v: string) => void;
  onDocnumChange: (v: string) => void;
  error?: string;
};

/** Tipo de documento (CPF/RG/Passaporte/CNH) + número mascarado. Porta selectDoctype/combo-doc. */
export function DocumentField({ doctype, docnum, onDoctypeChange, onDocnumChange, error }: DocumentFieldProps) {
  const { open, pos, anchorRef, panelRef, toggle, close } = useFloatingDropdown();
  const labelId = useId();

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
        <span>{doctype}</span>
      </button>
      <div className={styles.sep} />
      <input
        id="f-docnum"
        type="text"
        className={styles.input}
        value={docnum}
        onChange={(e) => onDocnumChange(maskDocNumber(e.target.value, doctype))}
        placeholder={DOC_PLACEHOLDER[doctype] ?? ''}
        maxLength={18}
        inputMode={doctype === 'Passaporte' ? 'text' : 'numeric'}
      />

      <DropdownPanel open={open} pos={pos} panelRef={panelRef}>
        <div role="listbox" aria-labelledby={labelId}>
          {DOC_TYPES.map((t) => (
            <div
              key={t}
              role="option"
              aria-selected={t === doctype}
              className={`${styles.option} ${t === doctype ? styles.selected : ''}`}
              onClick={() => {
                onDoctypeChange(t);
                onDocnumChange('');
                close();
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </DropdownPanel>

      {error && <p className={styles.helper}>{error}</p>}
    </div>
  );
}
