import styles from './SecurityBadges.module.css';

const badges = [
  {
    label: 'LGPD Compliance',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="#4BAF4F" strokeWidth="1.2"/>
        <path d="M5.5 5.5H10.5" stroke="#4BAF4F" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M5.5 8H10.5" stroke="#4BAF4F" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M5.5 10.5H8.5" stroke="#4BAF4F" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'PCI Compliant',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="5.5" width="10" height="7" rx="1.5" stroke="#4BAF4F" strokeWidth="1.2"/>
        <path d="M4.5 5.5V3.5C4.5 2.11929 5.61929 1 7 1C8.38071 1 9.5 2.11929 9.5 3.5V5.5" stroke="#4BAF4F" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="7" cy="9" r="1" fill="#4BAF4F"/>
      </svg>
    ),
  },
  {
    label: 'SSL Secure',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L2.5 3.5V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V3.5L8 1.5Z" stroke="#4BAF4F" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: '256-bit Encryption',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="#4BAF4F" strokeWidth="1.2"/>
        <path d="M5 8L7 10L11 6" stroke="#4BAF4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function SecurityBadges() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Este link é protegido por:</p>
      <div className={styles.badges}>
        {badges.map((badge) => (
          <div key={badge.label} className={styles.badge}>
            <span className={styles.icon}>{badge.icon}</span>
            <span className={styles.label}>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
