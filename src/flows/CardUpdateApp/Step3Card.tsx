import { ArrowLeft } from 'lucide-react';
import { CardFields, type CardData } from '../../components/CardFields/CardFields';
import formStyles from '../../styles/form-step.module.css';

type Step3Props = {
  data: CardData;
  onChange: (patch: Partial<CardData>) => void;
  onBack: () => void;
  onPay: () => void;
  totalLabel: string;
};

/** Passo 3 — Dados do Cartão (com "Voltar"). Porta o step-3 do fluxo completo (prototypes/v3.html). */
export function Step3Card({ data, onChange, onBack, onPay, totalLabel }: Step3Props) {
  return (
    <div className={formStyles.step}>
      <div>
        <div className={formStyles.title}>Dados do Cartão</div>
        <div className={formStyles.subtitle}>Pagamento seguro e criptografado</div>
      </div>

      <CardFields data={data} onChange={onChange} />

      <div className={formStyles.btnRow} style={{ marginTop: 4 }}>
        <div className={formStyles.btnBackWrap}>
          <button className={formStyles.btnBack} onClick={onBack}>
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
        <button className={`${formStyles.btnPrimary} ${formStyles.btnPay}`} onClick={onPay} style={{ marginTop: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <rect x="2" y="6" width="12" height="8" rx="2" stroke="#FFFFFF" strokeWidth="1.6" />
            <path d="M5 6V4.5a3 3 0 016 0V6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Pagar {totalLabel}
        </button>
      </div>

      <p className={formStyles.securityNote}>🔒 Seus dados são protegidos com criptografia de ponta-a-ponta</p>
    </div>
  );
}
