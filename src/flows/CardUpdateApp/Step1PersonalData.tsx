import { ArrowRight } from 'lucide-react';
import { M3Field } from '../../components/M3Field/M3Field';
import { CountryField } from '../../components/Combobox/CountryField';
import { PhoneField } from '../../components/Combobox/PhoneField';
import { DocumentField } from '../../components/Combobox/DocumentField';
import { maskDate } from '../../lib/masks';
import type { Step1Data, Step1Errors } from '../../lib/validation';
import formStyles from '../../styles/form-step.module.css';

type Step1Props = {
  data: Step1Data;
  errors: Step1Errors;
  onChange: (patch: Partial<Step1Data>) => void;
  onNext: () => void;
  shake: boolean;
};

/** Passo 1 — Dados Pessoais. Porta o step-1 do fluxo completo (prototypes/v3.html). */
export function Step1PersonalData({ data, errors, onChange, onNext, shake }: Step1Props) {
  return (
    <div className={formStyles.step}>
      <div>
        <div className={formStyles.title}>Dados Pessoais</div>
        <div className={formStyles.subtitle}>Preencha seus dados de identificação</div>
      </div>

      <div className={formStyles.fieldGroup}>
        <M3Field
          label="Nome completo"
          id="f-nome"
          autoComplete="name"
          value={data.nome}
          onChange={(e) => onChange({ nome: e.target.value })}
          error={errors.nome}
        />
      </div>

      <div className={formStyles.fieldGroup}>
        <M3Field
          label="E-mail"
          id="f-email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          error={errors.email}
        />
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup}>
          <M3Field
            label="Data de nascimento"
            id="f-dob"
            inputMode="numeric"
            maxLength={10}
            value={data.nascimento}
            onChange={(e) => onChange({ nascimento: maskDate(e.target.value) })}
            error={errors.nascimento}
          />
        </div>
        <div className={formStyles.fieldGroup}>
          <CountryField
            value={data.pais}
            onChange={(iso) => {
              // Ao mudar o país, sincroniza o DDI do telefone — porta selectComboItem (prototypes/v3.html).
              onChange({ pais: iso, ddiIso: iso });
            }}
          />
        </div>
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup}>
          <PhoneField
            ddiIso={data.ddiIso}
            telefone={data.telefone}
            onDdiChange={(iso) => onChange({ ddiIso: iso })}
            onTelefoneChange={(v) => onChange({ telefone: v })}
            error={errors.telefone}
          />
        </div>
        <div className={formStyles.fieldGroup}>
          <DocumentField
            doctype={data.doctype}
            docnum={data.docnum}
            onDoctypeChange={(v) => onChange({ doctype: v })}
            onDocnumChange={(v) => onChange({ docnum: v })}
            error={errors.docnum}
          />
        </div>
      </div>

      <button className={`${formStyles.btnPrimary} ${shake ? formStyles.shake : ''}`} onClick={onNext}>
        Próximo
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
