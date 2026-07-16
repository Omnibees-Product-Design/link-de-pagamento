import { useState } from 'react';
import { CheckoutShell } from '../../components/CheckoutShell/CheckoutShell';
import { ProcessingOverlay } from '../../components/ProcessingOverlay/ProcessingOverlay';
import { SuccessPage } from '../../components/SuccessPage/SuccessPage';
import { CardFields, CARD_DATA_INITIAL, type CardData } from '../../components/CardFields/CardFields';
import { detectCardBrand, CARD_BRAND_LABEL } from '../../lib/masks';
import { installmentOptions, reservation } from '../../data/reservation';
import formStyles from '../../styles/form-step.module.css';

/**
 * Fluxo "Pagamento" — um único passo (Dados do Cartão), sem Dados
 * Pessoais/Endereço nem StepIndicator. Porta v3-pay.html: o hóspede já é
 * conhecido, só falta pagar/actualizar o cartão para cobrar o valor.
 */
export function PaymentApp() {
  const [card, setCard] = useState<CardData>(CARD_DATA_INITIAL);
  const [phase, setPhase] = useState<'form' | 'processing' | 'success'>('form');
  const [fadeOut, setFadeOut] = useState(false);

  function handlePay() {
    setPhase('processing');
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setPhase('success');
        setFadeOut(false);
      }, 500);
    }, 2400);
  }

  if (phase === 'success') {
    const brand = detectCardBrand(card.cardNumber.replace(/\D/g, ''));
    const opt = installmentOptions.find((o) => o.n === card.installments) ?? installmentOptions[0];
    return (
      <SuccessPage
        guestFirstName={reservation.guestName.split(' ')[0]}
        hotelName={reservation.hotelName}
        bookingNumber={reservation.bookingNumber}
        period={`${reservation.checkIn.slice(0, 5)} — ${reservation.checkOut}`}
        installmentLabel={`${opt.n}× de ${opt.valueLabel}${brand ? ` · ${CARD_BRAND_LABEL[brand]}` : ''}`}
        totalLabel={reservation.total}
      />
    );
  }

  return (
    <>
      <CheckoutShell>
        <div className={formStyles.step}>
          <div>
            <div className={formStyles.title}>Dados do Cartão</div>
            <div className={formStyles.subtitle}>Pagamento seguro e criptografado</div>
          </div>

          <CardFields data={card} onChange={(patch) => setCard((d) => ({ ...d, ...patch }))} />

          <button className={`${formStyles.btnPrimary} ${formStyles.btnPay}`} onClick={handlePay}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <rect x="2" y="6" width="12" height="8" rx="2" stroke="#FFFFFF" strokeWidth="1.6" />
              <path d="M5 6V4.5a3 3 0 016 0V6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Pagar {reservation.total}
          </button>

          <p className={formStyles.securityNote}>🔒 Seus dados são protegidos com criptografia de ponta-a-ponta</p>
        </div>
      </CheckoutShell>
      {phase === 'processing' && <ProcessingOverlay fadeOut={fadeOut} />}
    </>
  );
}
