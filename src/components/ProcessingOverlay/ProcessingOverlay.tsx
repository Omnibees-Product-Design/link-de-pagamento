import styles from './ProcessingOverlay.module.css';

type ProcessingOverlayProps = {
  fadeOut: boolean;
};

/** Overlay "Processando pagamento..." — porta processPay/showSuccess (prototypes/v3.html). */
export function ProcessingOverlay({ fadeOut }: ProcessingOverlayProps) {
  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.box}>
        <svg className={styles.spinner} width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="21" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
          <path d="M26 5a21 21 0 0121 21" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className={styles.title}>Processando pagamento...</p>
        <p className={styles.sub}>Não feche esta janela</p>
      </div>
    </div>
  );
}
