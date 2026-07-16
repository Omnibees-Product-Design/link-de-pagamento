// Máscaras e detecção de bandeira — portados 1:1 da lógica do protótipo
// (prototypes/v3.html: handleCardNumber, detectCardBrand, handleExpiry, e a
// máscara de data/CEP/documento usadas em bindClearErrors). Funções puras,
// sem DOM — recebem/devolvem strings, para serem usadas em onChange controlado.

/** "12345678901" → "123.456.789-01" (CPF) ou "12.345.678/0001-90" (CNPJ). */
export function maskDocNumber(raw: string, doctype: string): string {
  const digits = raw.replace(/\D/g, '');
  if (doctype === 'CPF') {
    return digits
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  if (doctype === 'CNPJ') {
    return digits
      .slice(0, 14)
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  // RG, Passaporte, CNH — sem máscara, só maiúsculas para Passaporte.
  return doctype === 'Passaporte' ? raw.toUpperCase() : raw;
}

export const DOC_PLACEHOLDER: Record<string, string> = {
  CPF: '000.000.000-00',
  RG: '00.000.000-0',
  Passaporte: 'AB123456',
  CNH: '00000000000',
};

/** Máscara automática DD/MM/AAAA enquanto o utilizador digita. */
export function maskDate(raw: string): string {
  let v = raw.replace(/\D/g, '').slice(0, 8);
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
  if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5, 9);
  return v;
}

/** Verifica se "DD/MM/AAAA" é uma data real (não só o formato). */
export function isValidDate(dob: string): boolean {
  const parts = dob.split('/');
  if (parts.length !== 3) return false;
  const d = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const y = parseInt(parts[2], 10);
  const date = new Date(0);
  date.setFullYear(y, m - 1, d);
  return (
    date.getDate() === d &&
    date.getMonth() === m - 1 &&
    date.getFullYear() === y &&
    y >= 1900 &&
    date < new Date()
  );
}

/** "01310100" → "01310-100". */
export function maskCEP(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  return digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits;
}

/** "4111111111111111" → "4111 1111 1111 1111" (máx. 16 dígitos). */
export function maskCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

/** "1225" → "12/25". */
export function maskExpiry(raw: string): string {
  let v = raw.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
  return v;
}

export type CardBrand =
  | 'visa' | 'mc' | 'amex' | 'elo' | 'hipercard' | 'discover'
  | 'diners' | 'jcb' | 'unionpay' | 'maestro' | 'aura';

export const CARD_BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'Visa', mc: 'Mastercard', amex: 'American Express', elo: 'Elo',
  hipercard: 'Hipercard', discover: 'Discover', diners: 'Diners Club',
  jcb: 'JCB', unionpay: 'UnionPay', maestro: 'Maestro', aura: 'Aura',
};

/**
 * Detecta a bandeira pelos primeiros dígitos (BIN) do número do cartão.
 * Ranges portados 1:1 de detectCardBrand (prototypes/v3.html). `digits` = só
 * dígitos (sem espaços); devolve `null` quando não reconhece nenhuma bandeira.
 */
export function detectCardBrand(digits: string): CardBrand | null {
  if (!digits) return null;

  const first = digits[0];
  const first2 = parseInt(digits.slice(0, 2).padEnd(2, '0') || '0', 10);
  const first4 = parseInt(digits.slice(0, 4).padEnd(4, '0'), 10);
  const first6 = parseInt(digits.slice(0, 6).padEnd(6, '0'), 10);

  const eloBins6 = [
    401178, 401179, 431274, 438935, 451416, 457393, 457631, 457632,
    504175, 627780, 636297, 636368, 650031, 650032, 650033, 650035, 650036, 650037,
    650038, 650039, 650040, 650041, 650042, 650043, 650044, 650045, 650046, 650047,
    650048, 650049, 650050, 650051, 650405, 650406, 650407, 650408, 650409, 650410,
    506699, 506700, 506701, 506702, 506703, 506704, 506705, 506706, 506707, 506708,
    506709, 506710, 506711, 506712, 506713, 506714, 506715, 509000, 509001, 509002,
  ];
  const eloBins4 = [4011, 4312, 4389, 4514, 4576];
  if (eloBins6.includes(first6) || eloBins4.includes(first4)) return 'elo';

  if (first6 === 606282 || first4 === 3841) return 'hipercard';

  if (first2 === 50) return 'aura';

  if (first === '3' && (digits[1] === '4' || digits[1] === '7')) return 'amex';

  if (first === '3' && ((first2 >= 30 && first2 <= 35) || first2 === 36 || first2 === 38)) return 'diners';

  if (first4 >= 3528 && first4 <= 3589) return 'jcb';

  if (first2 === 62) return 'unionpay';

  if (first4 === 6011 || (first6 >= 622126 && first6 <= 622925) || (first2 >= 64 && first2 <= 65)) return 'discover';

  if ([6304, 6759, 6761, 6762, 6763].includes(first4)) return 'maestro';

  if ((first2 >= 51 && first2 <= 55) || (first4 >= 2221 && first4 <= 2720)) return 'mc';

  if (first === '4') return 'visa'; // depois de Elo, que também pode começar por 4

  return null;
}
