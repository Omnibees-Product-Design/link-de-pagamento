import { useId, useMemo, useState } from 'react';
import { useFloatingDropdown } from './useFloatingDropdown';
import { DropdownPanel } from './DropdownPanel';
import { COUNTRIES } from '../../lib/countries';
import styles from './Combobox.module.css';

type CountryFieldProps = {
  value: string; // ISO (ex.: "BR")
  onChange: (iso: string) => void;
  error?: string;
};

/**
 * Selector de País, pesquisável, com bandeira — porta combo-pais
 * (openComboSearch/filterCombo/selectComboItem). Ao seleccionar, o chamador
 * (Step1) sincroniza o DDI do telefone via COUNTRIES, tal como o
 * selectComboItem original fazia internamente.
 */
export function CountryField({ value, onChange, error }: CountryFieldProps) {
  const { open, pos, anchorRef, panelRef, openDropdown, close } = useFloatingDropdown();
  const [query, setQuery] = useState('');
  const labelId = useId();

  const selected = COUNTRIES.find((c) => c.iso === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.label.toLowerCase().startsWith(q));
  }, [query]);

  return (
    <div className={styles.field + (open ? ` ${styles.open}` : '') + (error ? ` ${styles.error}` : '')} ref={anchorRef}>
      <span className={`fi fi-${(selected?.iso ?? 'br').toLowerCase()} ${styles.flag}`} style={{ marginLeft: 16 }} aria-hidden="true" />
      <input
        type="text"
        className={styles.searchInput}
        value={open ? query : (selected?.label ?? '')}
        placeholder="País"
        aria-labelledby={labelId}
        onFocus={() => {
          setQuery('');
          openDropdown();
        }}
        onChange={(e) => setQuery(e.target.value)}
      />

      <DropdownPanel open={open} pos={pos} panelRef={panelRef}>
        <div role="listbox" aria-labelledby={labelId}>
          {filtered.map((c) => (
            <div
              key={c.iso}
              role="option"
              aria-selected={c.iso === value}
              className={`${styles.option} ${c.iso === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(c.iso);
                setQuery('');
                close();
              }}
            >
              <span className={`fi fi-${c.iso.toLowerCase()} ${styles.flag}`} aria-hidden="true" />
              {c.label}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={styles.option} style={{ color: 'var(--color-gray-500)', cursor: 'default' }}>
              Nenhum resultado
            </div>
          )}
        </div>
      </DropdownPanel>

      {error && <p className={styles.helper}>{error}</p>}
    </div>
  );
}
