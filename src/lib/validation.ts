// Validação por passo — portada 1:1 das regras de negócio de validateStep1 /
// validateStep2 (prototypes/v3.html), mas a operar sobre um objecto de estado
// em vez de document.getElementById. Cada validador devolve um mapa
// { campo: mensagem } — vazio = tudo ok.

import { isValidDate } from './masks';

export type Step1Data = {
  nome: string;
  email: string;
  pais: string; // ISO do país (ex.: "BR")
  ddiIso: string; // ISO do país do DDI seleccionado (pode divergir de `pais`)
  telefone: string;
  doctype: string;
  docnum: string;
  nascimento: string;
};

export type Step1Errors = Partial<Record<keyof Step1Data, string>>;

export function validateStep1(data: Step1Data): Step1Errors {
  const errors: Step1Errors = {};

  const nome = data.nome.trim();
  if (!nome) errors.nome = 'Nome obrigatório';
  else if (nome.split(/\s+/).filter(Boolean).length < 2) errors.nome = 'Informe nome e sobrenome';

  const email = data.email.trim();
  if (!email) errors.email = 'E-mail obrigatório';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'E-mail inválido';

  const nascimento = data.nascimento.trim();
  if (!nascimento) errors.nascimento = 'Data obrigatória';
  else if (!isValidDate(nascimento)) errors.nascimento = 'Data inválida';

  const telDigits = data.telefone.replace(/\D/g, '');
  if (!telDigits || telDigits.length < 10) errors.telefone = 'Telefone inválido';

  const docDigits = data.docnum.replace(/\D/g, '');
  if (!docDigits) errors.docnum = 'Documento obrigatório';
  else if (data.doctype === 'CPF' && docDigits.length !== 11) errors.docnum = 'CPF deve ter 11 dígitos';
  else if (data.doctype === 'CNPJ' && docDigits.length !== 14) errors.docnum = 'CNPJ deve ter 14 dígitos';

  return errors;
}

export type Step2Data = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type Step2Errors = Partial<Record<keyof Step2Data, string>>;

export function validateStep2(data: Step2Data): Step2Errors {
  const errors: Step2Errors = {};

  if (data.cep.replace(/\D/g, '').length !== 8) errors.cep = 'CEP inválido';
  if (!data.logradouro.trim()) errors.logradouro = 'Logradouro obrigatório';
  if (!data.numero.trim()) errors.numero = 'Número obrigatório';
  if (!data.bairro.trim()) errors.bairro = 'Bairro obrigatório';
  if (!data.cidade.trim()) errors.cidade = 'Cidade obrigatória';
  if (!data.estado) errors.estado = 'Estado obrigatório';

  return errors;
}
