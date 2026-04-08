import ReservationSummary from '../ReservationSummary/ReservationSummary';
import SecurityBadges from '../SecurityBadges/SecurityBadges';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Bee2Pay</span>
            <span className={styles.logoDot}>°</span>
          </div>
          <div className={styles.langSelector}>
            <span className={styles.flag}>🇧🇷</span>
            <span className={styles.langText}>Português (BR)</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#273240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <ReservationSummary />
      </div>
      <SecurityBadges />
    </aside>
  );
}
