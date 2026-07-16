import { M3Field } from '../M3Field/M3Field';
import { CardNumberField } from '../CardNumberField/CardNumberField';
import { CVVField } from '../CVVField/CVVField';
import { InstallmentField } from '../Combobox/InstallmentField';
import { maskExpiry } from '../../lib/masks';
import formStyles from '../../styles/form-step.module.css';

export type CardData = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
  installments: number;
};

export const CARD_DATA_INITIAL: CardData = {
  cardNumber: '', expiry: '', cvv: '', cardName: '', installments: 1,
};

type CardFieldsProps = {
  data: CardData;
  onChange: (patch: Partial<CardData>) => void;
};

/**
 * Campos de "Dados do Cartão" — partilhados entre os dois fluxos (idênticos
 * em ambos: CardUpdateApp passo 3 e PaymentApp passo único). Porta o
 * field-group do número/validade/CVV/nome/parcelamento (prototypes/v3.html).
 * Sem validação obrigatória — o original também não bloqueia o "Pagar" por
 * campos de cartão vazios (é um mock, sem processamento real).
 */
export function CardFields({ data, onChange }: CardFieldsProps) {
  return (
    <>
      <div className={formStyles.fieldGroup}>
        <CardNumberField value={data.cardNumber} onChange={(v) => onChange({ cardNumber: v })} />
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup}>
          <M3Field
            label="Validade"
            id="f-expiry"
            inputMode="numeric"
            maxLength={5}
            autoComplete="new-password"
            value={data.expiry}
            onChange={(e) => onChange({ expiry: maskExpiry(e.target.value) })}
          />
        </div>
        <div className={formStyles.fieldGroup}>
          <CVVField value={data.cvv} onChange={(v) => onChange({ cvv: v })} />
        </div>
      </div>

      <div className={formStyles.fieldGroup}>
        <M3Field
          label="Nome no cartão"
          id="f-cardname"
          autoComplete="new-password"
          value={data.cardName}
          onChange={(e) => onChange({ cardName: e.target.value.toUpperCase() })}
        />
      </div>

      <div className={formStyles.fieldGroup}>
        <InstallmentField value={data.installments} onChange={(n) => onChange({ installments: n })} />
      </div>
    </>
  );
}
