import { useId } from 'react';
import { useFloatingDropdown } from './useFloatingDropdown';
import { DropdownPanel } from './DropdownPanel';
import { installmentOptions } from '../../data/reservation';
import styles from './Combobox.module.css';

type InstallmentFieldProps = {
  value: number; // nº de parcelas
  onChange: (n: number) => void;
};

function optionLabel(n: number, valueLabel: string, rateLabel: string) {
  return `${n}× de ${valueLabel} (${rateLabel})`;
}

/** Selector de parcelamento — porta o parc-trigger/parc-dropdown. */
export function InstallmentField({ value, onChange }: InstallmentFieldProps) {
  const { open, pos, anchorRef, panelRef, toggle, close } = useFloatingDropdown();
  const labelId = useId();
  const selected = installmentOptions.find((o) => o.n === value) ?? installmentOptions[0];

  return (
    <div className={styles.field + (open ? ` ${styles.open}` : '')} ref={anchorRef}>
      <button
        type="button"
        className={`${styles.trigger} ${styles.triggerFlex}`}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
      >
        <span>{optionLabel(selected.n, selected.valueLabel, selected.rateLabel)}</span>
      </button>

      <DropdownPanel open={open} pos={pos} panelRef={panelRef}>
        <div role="listbox" aria-labelledby={labelId}>
          {installmentOptions.map((o) => (
            <div
              key={o.n}
              role="option"
              aria-selected={o.n === value}
              className={`${styles.option} ${o.n === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(o.n);
                close();
              }}
            >
              {optionLabel(o.n, o.valueLabel, o.rateLabel)}
            </div>
          ))}
        </div>
      </DropdownPanel>
    </div>
  );
}
