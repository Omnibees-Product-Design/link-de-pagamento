import type { CardBrand } from '../../lib/masks';
import styles from './CardBrandBadge.module.css';

const TEXT_LABEL: Partial<Record<CardBrand, string>> = {
  visa: 'VISA', amex: 'AMEX', discover: 'DISC', diners: 'DINERS',
  jcb: 'JCB', unionpay: 'UP', elo: 'ELO', hipercard: 'HIPER', aura: 'AURA',
};

const BRAND_CLASS: Record<CardBrand, string> = {
  visa: styles.visa, mc: styles.mc, amex: styles.amex, elo: styles.elo,
  hipercard: styles.hipercard, discover: styles.discover, diners: styles.diners,
  jcb: styles.jcb, unionpay: styles.unionpay, maestro: styles.maestro, aura: styles.aura,
};

/** Ícone genérico (cartão em branco) mostrado quando nenhuma bandeira é detectada. */
function GenericCardIcon() {
  return (
    <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.25" y="0.25" width="24.5" height="16.5" rx="2.25" fill="white" stroke="#D9D9D9" strokeWidth="0.5" />
      <rect x="0.5" y="3.5" width="24" height="3" fill="#D9D9D9" />
    </svg>
  );
}

/** Badge de bandeira detectada ao vivo — porta detectCardBrand/os `renders` (prototypes/v3.html). */
export function CardBrandBadge({ brand }: { brand: CardBrand | null }) {
  if (!brand) {
    return (
      <div className={`${styles.badge} ${styles.generic}`}>
        <GenericCardIcon />
      </div>
    );
  }

  if (brand === 'mc') {
    return (
      <div className={`${styles.badge} ${BRAND_CLASS.mc}`}>
        <div className={styles.mcCircles}>
          <div className={styles.mcLeft} />
          <div className={styles.mcRight} />
        </div>
      </div>
    );
  }

  if (brand === 'maestro') {
    return (
      <div className={`${styles.badge} ${BRAND_CLASS.maestro}`}>
        <div className={styles.maestroCircles}>
          <div className={styles.maestroLeft} />
          <div className={styles.maestroRight} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.badge} ${BRAND_CLASS[brand]} ${styles.text}`}>
      {TEXT_LABEL[brand]}
    </div>
  );
}
