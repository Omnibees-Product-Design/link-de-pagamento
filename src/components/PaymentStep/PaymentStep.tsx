import { useState } from 'react';
import styles from './PaymentStep.module.css';
import { reservation } from '../../data/reservation';

type PayMode = '1pagamento' | '2cartoes' | 'cartao_pix';
type SingleMethod = 'cartao' | 'pix';

function CardSVG() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true" className={styles.methodIcon}>
      <rect x="0.75" y="0.75" width="16.5" height="12.5" rx="1.75" stroke="#273240" strokeWidth="1.5" />
      <path d="M0.75 4.5H17.25" stroke="#273240" strokeWidth="1.5" />
      <rect x="2.5" y="7.5" width="3.5" height="2" rx="0.5" fill="#273240" />
    </svg>
  );
}

function PixSVG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.methodIcon}>
      <path d="M12 2L15.5 5.5L12 9L8.5 5.5Z" fill="#32BCAD" />
      <path d="M22 12L18.5 8.5L15 12L18.5 15.5Z" fill="#32BCAD" />
      <path d="M12 22L8.5 18.5L12 15L15.5 18.5Z" fill="#32BCAD" />
      <path d="M2 12L5.5 8.5L9 12L5.5 15.5Z" fill="#32BCAD" />
    </svg>
  );
}

function ShieldCheckSVG() {
  return (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" aria-hidden="true">
      <path d="M7.5 1.5L1.5 4.2v4.3c0 3.2 2.6 6.2 6 6.95 3.4-.75 6-3.75 6-6.95V4.2L7.5 1.5z" stroke="white" strokeWidth="1.3" />
      <path d="M5 8.1L6.8 9.9L10.5 6" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.8" stroke="#9C9C9C" strokeWidth="1.2" />
      <path d="M7 6.5V10" stroke="#9C9C9C" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.65" fill="#9C9C9C" />
    </svg>
  );
}

function ClockSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="#273240" strokeWidth="1.2" />
      <path d="M7 4V7L9 8.5" stroke="#273240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronSVG() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#273240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QRPlaceholder() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-label="QR Code PIX">
      {/* Top-left finder */}
      <rect x="10" y="10" width="38" height="38" rx="3" fill="none" stroke="#273240" strokeWidth="3" />
      <rect x="19" y="19" width="20" height="20" rx="1.5" fill="#273240" />
      {/* Top-right finder */}
      <rect x="92" y="10" width="38" height="38" rx="3" fill="none" stroke="#273240" strokeWidth="3" />
      <rect x="101" y="19" width="20" height="20" rx="1.5" fill="#273240" />
      {/* Bottom-left finder */}
      <rect x="10" y="92" width="38" height="38" rx="3" fill="none" stroke="#273240" strokeWidth="3" />
      <rect x="19" y="101" width="20" height="20" rx="1.5" fill="#273240" />
      {/* Data modules */}
      {[60,70,80].map(x => [10,18,26,34].map(y => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#273240" />))}
      {[10,20,30,40].map(x => [60,70,80].map(y => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#273240" />))}
      {[60,70,80,90,100,110,120].map(x => [60,70,80,90,100,110,120].map((y, i) => (
        (x + y) % 20 === 0 || (x * i) % 30 === 0
          ? <rect key={`d-${x}-${y}`} x={x} y={y} width="6" height="6" fill="#273240" />
          : null
      )))}
      {[10,20,30,40].map(x => [92,100,110,120].map(y => <rect key={`bl-${x}-${y}`} x={x} y={y} width="6" height="6" fill="#273240" />))}
      {[92,100,110,120].map(x => [10,20,30,40].map(y => <rect key={`tr-${x}-${y}`} x={x} y={y} width="6" height="6" fill="#273240" />))}
    </svg>
  );
}

function CardForm({ showValorPagar = false }: { showValorPagar?: boolean }) {
  return (
    <div className={styles.cardForm}>
      <div className={styles.cardNumRow}>
        <input className={styles.cardInput} placeholder="Número do cartão" inputMode="numeric" maxLength={19} />
        <div className={styles.cardBrandBox} />
      </div>
      <div className={styles.cardTwoCol}>
        <input className={styles.cardInput} placeholder="Validade" />
        <div className={styles.cvvWrap}>
          <input className={styles.cardInput} placeholder="CVV" inputMode="numeric" maxLength={4} />
          <span className={styles.cvvInfo}><InfoSVG /></span>
        </div>
      </div>
      <input className={styles.cardInput} placeholder="Nome no cartão" autoComplete="cc-name" />
      {showValorPagar && (
        <input className={styles.cardInput} placeholder="Valor a pagar" />
      )}
      <div className={styles.installmentWrap}>
        <span className={styles.installmentLabel}>Parcelamento</span>
        <select className={styles.installmentSelect} defaultValue="1">
          <option value="1">1× de {reservation.amount} (sem juros)</option>
          <option value="2">2× de R$ 2.560,00 (sem juros)</option>
          <option value="3">3× de R$ 1.706,67 (sem juros)</option>
        </select>
        <span className={styles.installmentChevron}><ChevronSVG /></span>
      </div>
    </div>
  );
}

function PixExpandedContent() {
  return (
    <div className={styles.pixContent}>
      <p className={styles.pixScanText}>Escaneie o QR code ou copie o código.</p>
      <div className={styles.qrWrap}>
        <QRPlaceholder />
      </div>
      <div className={styles.pixExpiry}>
        <ClockSVG />
        <span>O link irá expirar em: <strong>5:00</strong></span>
      </div>
      <button className={styles.copyQrBtn} type="button">
        Copiar código do QR Code
      </button>
      <div className={styles.pixInstructions}>
        <p className={styles.pixInstructTitle}>Pagar com Pix</p>
        <ol className={styles.pixSteps}>
          <li>Abra o aplicativo do seu banco;</li>
          <li>Entre na área Pix e escolha a opção Pix Copia e Cola</li>
          <li>Insira o código copiado nesta cobrança</li>
          <li>Revise o pagamento e confirme</li>
        </ol>
        <p className={styles.pixDesktopNote}>
          Se estiver no computador, abra o aplicativo do seu banco e escaneie o
          QR Code acima com a câmera do celular
        </p>
      </div>
    </div>
  );
}

export default function PaymentStep() {
  const [mode, setMode] = useState<PayMode>('1pagamento');
  const [singleMethod, setSingleMethod] = useState<SingleMethod>('cartao');
  const [card2Open, setCard2Open] = useState(false);

  const tabs: { id: PayMode; label: string }[] = [
    { id: '1pagamento', label: '1 pagamento' },
    { id: '2cartoes', label: '2 cartões' },
    { id: 'cartao_pix', label: 'Cartão + Pix' },
  ];

  const isPayDisabled = mode === '1pagamento' && singleMethod === 'pix';
  const ctaLabel = mode === 'cartao_pix' ? 'Avançar' : 'Pagar com segurança';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Como você prefere pagar?</h2>

      {/* ─── Tab selector ─── */}
      <div className={styles.tabs} role="tablist" aria-label="Forma de pagamento">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={mode === id}
            className={mode === id ? styles.tabActive : styles.tab}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── 1 pagamento ─── */}
      {mode === '1pagamento' && (
        <div className={styles.methodList}>
          <div className={singleMethod === 'cartao' ? styles.methodSectionActive : styles.methodSection}>
            <button
              type="button"
              className={styles.methodHeader}
              onClick={() => setSingleMethod('cartao')}
              aria-expanded={singleMethod === 'cartao'}
            >
              <span className={singleMethod === 'cartao' ? styles.radioDot : styles.radioEmpty} aria-hidden="true" />
              <CardSVG />
              <span className={styles.methodLabel}>Cartão</span>
            </button>
            {singleMethod === 'cartao' && <CardForm />}
          </div>

          <div className={singleMethod === 'pix' ? styles.methodSectionActive : styles.methodSection}>
            <button
              type="button"
              className={styles.methodHeader}
              onClick={() => setSingleMethod('pix')}
              aria-expanded={singleMethod === 'pix'}
            >
              <span className={singleMethod === 'pix' ? styles.radioDot : styles.radioEmpty} aria-hidden="true" />
              <PixSVG />
              <span className={styles.methodLabel}>Pix</span>
            </button>
            {singleMethod === 'pix' && <PixExpandedContent />}
          </div>
        </div>
      )}

      {/* ─── 2 cartões ─── */}
      {mode === '2cartoes' && (
        <div className={styles.methodList}>
          <div className={styles.cardSection}>
            <div className={styles.cardSectionHeader}>
              <CardSVG />
              <span className={styles.cardSectionTitle}>Cartão 1</span>
            </div>
            <CardForm showValorPagar />
          </div>

          {card2Open ? (
            <div className={styles.cardSection}>
              <div className={styles.cardSectionHeader}>
                <CardSVG />
                <span className={styles.cardSectionTitle}>Cartão 2</span>
              </div>
              <CardForm showValorPagar />
            </div>
          ) : (
            <button
              type="button"
              className={styles.cardSectionCollapsed}
              onClick={() => setCard2Open(true)}
              aria-expanded={false}
            >
              <div className={styles.cardSectionHeader}>
                <CardSVG />
                <span className={styles.cardSectionTitle}>Cartão 2</span>
              </div>
            </button>
          )}
        </div>
      )}

      {/* ─── Cartão + Pix ─── */}
      {mode === 'cartao_pix' && (
        <div className={styles.methodList}>
          <div className={styles.cardSection}>
            <div className={styles.cardSectionHeader}>
              <CardSVG />
              <span className={styles.cardSectionTitle}>Cartão</span>
            </div>
            <CardForm showValorPagar />
          </div>

          <div className={styles.cardSection}>
            <div className={styles.cardSectionHeader}>
              <PixSVG />
              <span className={styles.cardSectionTitle}>Pix</span>
            </div>
            <div className={styles.pixInfoSection}>
              <div className={styles.pixValueField}>
                <span className={styles.pixValueLabel}>Valor a pagar</span>
                <span className={styles.pixValueAmount}>{reservation.total}</span>
              </div>
              <div className={styles.pixInfoBox}>
                <span className={styles.pixInfoIconWrap}><PixSVG size={24} /></span>
                <div>
                  <p className={styles.pixInfoTitle}>Informação</p>
                  <p className={styles.pixInfoText}>
                    O QR Code será exibido na próxima tela após você clicar em "Finalizar
                    reserva" e ficará disponível por 15 (quinze) minutos. Após esse período,
                    será necessário iniciar um novo processo de compensação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <div className={styles.footer}>
        <button type="button" className={styles.backBtn}>← Voltar</button>
        <button
          type="button"
          className={styles.payBtn}
          disabled={isPayDisabled}
          aria-disabled={isPayDisabled}
        >
          {mode !== 'cartao_pix' && <ShieldCheckSVG />}
          {ctaLabel}
        </button>
      </div>
      <p className={styles.secureText}>
        Seus dados são protegidos com criptografia de ponta-a-ponta
      </p>
    </div>
  );
}
