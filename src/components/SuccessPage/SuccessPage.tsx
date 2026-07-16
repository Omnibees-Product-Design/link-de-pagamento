import { useState } from 'react';
import { M3Field } from '../M3Field/M3Field';
import styles from './SuccessPage.module.css';

type SuccessPageProps = {
  guestFirstName: string;
  hotelName: string;
  bookingNumber: string;
  period: string; // "08/06 — 10/06/2024"
  installmentLabel: string; // "1× de R$ 5.120,00"
  totalLabel: string; // "R$ 5.120,00"
  defaultEmail?: string;
};

/** Ecrã de sucesso (check animado + resumo + receber comprovante) — porta showSuccess/sendReceipt/closeModal. */
export function SuccessPage({
  guestFirstName, hotelName, bookingNumber, period, installmentLabel, totalLabel, defaultEmail = '',
}: SuccessPageProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  function handleSend() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 2000);
      return;
    }
    setSentTo(trimmed);
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} glass-card`}>
        <div className={styles.header}>
          <div className={styles.checkWrap}>
            <svg className={styles.checkSvg} viewBox="0 0 80 80">
              <circle className={styles.checkCircle} cx="40" cy="40" r="35" transform="rotate(-90 40 40)" />
              <path className={styles.checkMark} d="M24 40 L35 52 L56 28" />
            </svg>
          </div>
          <div>
            <div className={styles.title}>Pagamento realizado com sucesso!</div>
            <div className={styles.subtitle}>Sua reserva está confirmada. Obrigado, {guestFirstName}!</div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.row}>
            <span className={styles.label}>Hotel</span>
            <span className={styles.value}>{hotelName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Reserva</span>
            <span className={styles.value}>{bookingNumber}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Período</span>
            <span className={styles.value}>{period}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Parcelamento</span>
            <span className={styles.value}>{installmentLabel}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.row}>
            <span className={styles.labelBold}>Total pago</span>
            <span className={styles.valueTotal}>{totalLabel}</span>
          </div>
        </div>

        <div className={styles.receiptSection}>
          <div className={styles.receiptTitle}>Receber comprovante por e-mail</div>
          <div className={styles.receiptRow}>
            <M3Field
              label="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? styles.emailError : ''}
            />
            <button className={styles.btnReceipt} onClick={handleSend}>
              Enviar
            </button>
          </div>
        </div>
      </div>

      {sentTo && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSentTo(null);
          }}
        >
          <div className={`${styles.modalCard} glass-card`}>
            <div className={styles.modalIcon}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="6" width="22" height="16" rx="3" stroke="#34D399" strokeWidth="1.8" />
                <path d="M3 10l11 7 11-7" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.modalTitle}>Comprovante enviado!</div>
            <div className={styles.modalText}>
              Enviamos o comprovante para
              <br />
              <strong style={{ color: 'var(--color-gray-800)' }}>{sentTo}</strong>.
              <br />
              Verifique sua caixa de entrada.
            </div>
            <button className={styles.btnModalClose} onClick={() => setSentTo(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
