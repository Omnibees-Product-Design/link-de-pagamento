import styles from './FormField.module.css';

type FormFieldProps = {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'select' | 'phone' | 'document';
  selectOptions?: string[];
  prefixOptions?: string[];
  prefixValue?: string;
};

export default function FormField({
  label,
  placeholder,
  type = 'text',
  selectOptions = [],
  prefixOptions = [],
  prefixValue,
}: FormFieldProps) {
  if (type === 'select') {
    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <select className={styles.select}>
            <option value="">{placeholder || label}</option>
            {selectOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className={styles.chevron} width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#273240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'phone') {
    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.compositeWrapper}>
          <div className={styles.prefixSelect}>
            <select className={styles.prefixSelectInner}>
              {prefixOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <svg className={styles.chevronSmall} width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#273240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.divider} />
          <input
            type="tel"
            className={styles.compositeInput}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }

  if (type === 'document') {
    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.compositeWrapper}>
          <div className={styles.prefixSelect}>
            <select className={styles.prefixSelectInner}>
              {prefixOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <svg className={styles.chevronSmall} width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#273240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.divider} />
          <input
            type="text"
            className={styles.compositeInput}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }

  if (type === 'date') {
    return (
      <div className={styles.field}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder || label}
            onFocus={(e) => { e.currentTarget.type = 'date'; }}
            onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text'; }}
          />
          <svg className={styles.calendarIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="#9C9C9C" strokeWidth="1.2"/>
            <path d="M1.5 6H14.5" stroke="#9C9C9C" strokeWidth="1.2"/>
            <path d="M5 1V3.5" stroke="#9C9C9C" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M11 1V3.5" stroke="#9C9C9C" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={styles.input}
          placeholder={placeholder || label}
        />
      </div>
    </div>
  );
}
