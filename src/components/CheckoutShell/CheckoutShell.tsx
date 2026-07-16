import type { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './CheckoutShell.module.css';

type CheckoutShellProps = {
  children: ReactNode;
};

/** Layout de duas colunas partilhado pelos dois fluxos — porta .page/.checkout-wrapper. */
export function CheckoutShell({ children }: CheckoutShellProps) {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={`${styles.panelRight} glass-card`}>{children}</main>
      </div>
    </div>
  );
}
