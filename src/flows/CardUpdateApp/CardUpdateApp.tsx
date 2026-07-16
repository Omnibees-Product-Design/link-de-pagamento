import { useState } from 'react';
import { CheckoutShell } from '../../components/CheckoutShell/CheckoutShell';
import { StepIndicator } from '../../components/StepIndicator/StepIndicator';
import { ProcessingOverlay } from '../../components/ProcessingOverlay/ProcessingOverlay';
import { SuccessPage } from '../../components/SuccessPage/SuccessPage';
import { CARD_DATA_INITIAL, type CardData } from '../../components/CardFields/CardFields';
import { Step1PersonalData } from './Step1PersonalData';
import { Step2Address } from './Step2Address';
import { Step3Card } from './Step3Card';
import { validateStep1, validateStep2, type Step1Data, type Step2Data, type Step1Errors, type Step2Errors } from '../../lib/validation';
import { detectCardBrand, CARD_BRAND_LABEL } from '../../lib/masks';
import { installmentOptions, reservation } from '../../data/reservation';

const STEP1_INITIAL: Step1Data = {
  nome: '', email: '', pais: 'BR', ddiIso: 'BR', telefone: '', doctype: 'CPF', docnum: '', nascimento: '',
};
const STEP2_INITIAL: Step2Data = {
  cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: 'SP',
};

/**
 * Fluxo "Atualização de Cartão" — 3 passos (Dados Pessoais → Endereço →
 * Cartão). Porta a lógica de goToStep/processPay (prototypes/v3.html) para
 * estado React: cada passo valida antes de avançar (shake + foco no 1º campo
 * inválido em caso de erro), "Voltar" nunca valida.
 */
export function CardUpdateApp() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goingBack, setGoingBack] = useState(false);

  const [step1, setStep1] = useState(STEP1_INITIAL);
  const [step2, setStep2] = useState(STEP2_INITIAL);
  const [card, setCard] = useState<CardData>(CARD_DATA_INITIAL);

  const [errors1, setErrors1] = useState<Step1Errors>({});
  const [errors2, setErrors2] = useState<Step2Errors>({});
  const [shake, setShake] = useState(false);

  const [phase, setPhase] = useState<'form' | 'processing' | 'success'>('form');
  const [fadeOut, setFadeOut] = useState(false);

  function focusFirstError(fieldId?: string) {
    if (!fieldId) return;
    const el = document.getElementById(fieldId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el?.focus(), 350);
    setShake(true);
    setTimeout(() => setShake(false), 350);
  }

  const STEP1_FIELD_ID: Record<string, string> = {
    nome: 'f-nome', email: 'f-email', nascimento: 'f-dob', telefone: 'f-tel', docnum: 'f-docnum',
  };
  const STEP2_FIELD_ID: Record<string, string> = {
    cep: 'f-cep', logradouro: 'f-logradouro', numero: 'f-numero', bairro: 'f-bairro', cidade: 'f-cidade', estado: 'estado-combo',
  };

  function goNext() {
    if (step === 1) {
      const errs = validateStep1(step1);
      setErrors1(errs);
      const firstKey = Object.keys(errs)[0];
      if (firstKey) return focusFirstError(STEP1_FIELD_ID[firstKey]);
      setGoingBack(false);
      setStep(2);
    } else if (step === 2) {
      const errs = validateStep2(step2);
      setErrors2(errs);
      const firstKey = Object.keys(errs)[0];
      if (firstKey) return focusFirstError(STEP2_FIELD_ID[firstKey]);
      setGoingBack(false);
      setStep(3);
    }
  }

  function goBack(n: 1 | 2) {
    setGoingBack(true);
    setStep(n);
  }

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
        guestFirstName={step1.nome.trim().split(/\s+/)[0] || reservation.guestName.split(' ')[0]}
        hotelName={reservation.hotelName}
        bookingNumber={reservation.bookingNumber}
        period={`${reservation.checkIn.slice(0, 5)} — ${reservation.checkOut}`}
        installmentLabel={`${opt.n}× de ${opt.valueLabel}${brand ? ` · ${CARD_BRAND_LABEL[brand]}` : ''}`}
        totalLabel={reservation.total}
        defaultEmail={step1.email}
      />
    );
  }

  return (
    <>
      <CheckoutShell>
        <StepIndicator current={step} />
        <div className={goingBack ? 'going-back' : undefined}>
          {step === 1 && (
            <Step1PersonalData
              data={step1}
              errors={errors1}
              onChange={(patch) => setStep1((d) => ({ ...d, ...patch }))}
              onNext={goNext}
              shake={shake}
            />
          )}
          {step === 2 && (
            <Step2Address
              data={step2}
              errors={errors2}
              onChange={(patch) => setStep2((d) => ({ ...d, ...patch }))}
              onNext={goNext}
              onBack={() => goBack(1)}
              shake={shake}
            />
          )}
          {step === 3 && (
            <Step3Card
              data={card}
              onChange={(patch) => setCard((d) => ({ ...d, ...patch }))}
              onBack={() => goBack(2)}
              onPay={handlePay}
              totalLabel={reservation.total}
            />
          )}
        </div>
      </CheckoutShell>
      {phase === 'processing' && <ProcessingOverlay fadeOut={fadeOut} />}
    </>
  );
}
