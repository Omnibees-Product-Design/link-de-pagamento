import { Check } from 'lucide-react';
import styles from './StepIndicator.module.css';

const STEPS = ['Dados', 'Endereço', 'Pagamento'];

type StepIndicatorProps = {
  current: 1 | 2 | 3;
};

/** Círculos + linhas de progresso — porta updateStepIndicator (prototypes/v3.html). */
export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className={styles.indicator}>
      {STEPS.map((label, i) => {
        const n = i + 1;
        const state = n < current ? 'done' : n === current ? 'active' : 'pending';
        return (
          <div key={label} style={{ display: 'contents' }}>
            <div className={`${styles.item} ${styles[state]}`}>
              <div className={`${styles.circle} ${styles[state]}`}>
                {state === 'done' ? <Check size={14} strokeWidth={2.5} /> : n}
              </div>
              <span className={styles.label}>{label}</span>
            </div>
            {n < STEPS.length && (
              <div className={`${styles.line} ${n < current ? 'done' : 'pending'} ${styles[n < current ? 'done' : 'pending']}`}>
                <div className={styles.lineBg} />
                <div className={styles.lineFill} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
