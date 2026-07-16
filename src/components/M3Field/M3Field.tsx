import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './M3Field.module.css';

type M3FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  label: string;
  error?: string;
  /** Ícone/botão dentro do campo, à direita (ex.: busca de CEP, badge de bandeira). */
  trailing?: ReactNode;
};

/**
 * Input de texto com label flutuante (Material 3 outlined). O `placeholder="
 * "` (um espaço) é o que activa o truque puro-CSS `:not(:placeholder-shown)`
 * — não expor `placeholder` como prop evita quebrar esse mecanismo por engano.
 */
export const M3Field = forwardRef<HTMLInputElement, M3FieldProps>(
  ({ label, error, trailing, id, className, ...props }, ref) => {
    return (
      <div className={`${styles.field} ${error ? styles.error : ''} ${className ?? ''}`}>
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={`${styles.input} ${trailing ? styles.hasTrailing : ''}`}
          {...props}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {trailing && <div className={styles.trailing}>{trailing}</div>}
        {error && <p className={styles.helper}>{error}</p>}
      </div>
    );
  }
);
M3Field.displayName = 'M3Field';
