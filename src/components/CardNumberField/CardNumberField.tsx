import { M3Field } from '../M3Field/M3Field';
import { CardBrandBadge } from './CardBrandBadge';
import { detectCardBrand, maskCardNumber } from '../../lib/masks';

type CardNumberFieldProps = {
  value: string;
  onChange: (masked: string) => void;
  error?: string;
};

/** Número do cartão com máscara "0000 0000 0000 0000" + badge de bandeira ao vivo. */
export function CardNumberField({ value, onChange, error }: CardNumberFieldProps) {
  const digits = value.replace(/\D/g, '');
  const brand = detectCardBrand(digits);

  return (
    <M3Field
      label="Número do cartão"
      id="f-cardnum"
      value={value}
      onChange={(e) => onChange(maskCardNumber(e.target.value))}
      inputMode="numeric"
      autoComplete="new-password"
      maxLength={19}
      error={error}
      trailing={<CardBrandBadge brand={brand} />}
    />
  );
}
