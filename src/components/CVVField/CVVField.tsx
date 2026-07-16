import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleHelp } from 'lucide-react';
import { M3Field } from '../M3Field/M3Field';
import styles from './CVVField.module.css';

type CVVFieldProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

/** CVV + tooltip explicativo (Amex 4 dígitos na frente · outros 3 dígitos atrás). */
export function CVVField({ value, onChange, error }: CVVFieldProps) {
  const [tip, setTip] = useState<{ left: number; top: number } | null>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  function show() {
    const el = iconRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const tipW = 300;
    const tipH = tooltipRef.current?.offsetHeight ?? 220;
    let left = r.right - tipW;
    const maxLeft = window.innerWidth - tipW - 8;
    if (left > maxLeft) left = maxLeft;
    if (left < 8) left = 8;
    let top = r.top - tipH - 14;
    if (top < 8) top = r.bottom + 8;
    setTip({ left, top });
  }
  function hide() {
    setTip(null);
  }

  return (
    <M3Field
      label="CVV"
      id="f-cvv"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 4))}
      inputMode="numeric"
      autoComplete="new-password"
      maxLength={4}
      error={error}
      trailing={
        <>
          <button
            ref={iconRef}
            type="button"
            className={styles.info}
            tabIndex={0}
            aria-label="O que é o CVV?"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
          >
            <CircleHelp size={16} />
          </button>
          {tip &&
            createPortal(
              <div ref={tooltipRef} className={styles.tooltip} style={{ left: tip.left, top: tip.top }}>
                <div className={styles.section}>
                  <p>
                    Para American Express, digite os <strong>4 dígitos</strong> na parte da frente do seu cartão:
                  </p>
                  <div className={`${styles.cardImg} ${styles.amexImg}`}>
                    <span className={styles.amexLogo}>AMEX</span>
                    <span className={styles.cardNums}>1234&nbsp;&nbsp;123456&nbsp;&nbsp;12345</span>
                    <span className={styles.codeBadge}>1234</span>
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.section}>
                  <p>
                    Para outros cartões, digite os <strong>3 dígitos</strong> na parte de trás do seu cartão:
                  </p>
                  <div className={`${styles.cardImg} ${styles.otherImg}`}>
                    <div className={styles.stripe} />
                    <div className={styles.sig}>
                      <span className={styles.codeBadge}>123</span>
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </>
      }
    />
  );
}
