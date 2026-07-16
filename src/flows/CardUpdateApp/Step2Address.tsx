import { useState } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { M3Field } from '../../components/M3Field/M3Field';
import { EstadoField } from '../../components/Combobox/EstadoField';
import { maskCEP } from '../../lib/masks';
import type { Step2Data, Step2Errors } from '../../lib/validation';
import formStyles from '../../styles/form-step.module.css';

type Step2Props = {
  data: Step2Data;
  errors: Step2Errors;
  onChange: (patch: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  shake: boolean;
};

/** Passo 2 — Endereço de Cobrança. Porta o step-2 (prototypes/v3.html), incl. busca de CEP via ViaCEP. */
export function Step2Address({ data, errors, onChange, onNext, onBack, shake }: Step2Props) {
  const [loadingCep, setLoadingCep] = useState(false);

  async function lookupCEP() {
    const cep = data.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    setLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await res.json();
      if (!json.erro) {
        onChange({
          logradouro: json.logradouro || '',
          bairro: json.bairro || '',
          cidade: json.localidade || '',
          estado: json.uf || data.estado,
        });
      }
    } catch {
      // silencioso — mesma resiliência do original (não bloqueia o preenchimento manual)
    } finally {
      setLoadingCep(false);
    }
  }

  return (
    <div className={formStyles.step}>
      <div>
        <div className={formStyles.title}>Endereço de Cobrança</div>
        <div className={formStyles.subtitle}>Informe o endereço vinculado ao seu cartão</div>
      </div>

      <div className={formStyles.fieldGroup} style={{ opacity: loadingCep ? 0.7 : 1 }}>
        <M3Field
          label="CEP"
          id="f-cep"
          maxLength={9}
          inputMode="numeric"
          value={data.cep}
          onChange={(e) => onChange({ cep: maskCEP(e.target.value) })}
          onKeyDown={(e) => e.key === 'Enter' && lookupCEP()}
          error={errors.cep}
          trailing={
            <button
              type="button"
              onClick={lookupCEP}
              aria-label="Buscar CEP"
              title="Buscar CEP"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-gray-800)' }}
            >
              <Search size={14} />
            </button>
          }
        />
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup} style={{ flex: 1 }}>
          <M3Field
            label="Logradouro"
            id="f-logradouro"
            autoComplete="street-address"
            value={data.logradouro}
            onChange={(e) => onChange({ logradouro: e.target.value })}
            error={errors.logradouro}
          />
        </div>
        <div className={formStyles.fieldGroup} style={{ flex: '0 0 120px' }}>
          <M3Field
            label="Número"
            id="f-numero"
            value={data.numero}
            onChange={(e) => onChange({ numero: e.target.value })}
            error={errors.numero}
          />
        </div>
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup} style={{ flex: 1 }}>
          <M3Field
            label="Complemento"
            id="f-complemento"
            value={data.complemento}
            onChange={(e) => onChange({ complemento: e.target.value })}
          />
        </div>
        <div className={formStyles.fieldGroup} style={{ flex: 1 }}>
          <M3Field
            label="Bairro"
            id="f-bairro"
            value={data.bairro}
            onChange={(e) => onChange({ bairro: e.target.value })}
            error={errors.bairro}
          />
        </div>
      </div>

      <div className={formStyles.fieldRow}>
        <div className={formStyles.fieldGroup}>
          <EstadoField value={data.estado} onChange={(uf) => onChange({ estado: uf })} error={errors.estado} />
        </div>
        <div className={formStyles.fieldGroup}>
          <M3Field
            label="Cidade"
            id="f-cidade"
            value={data.cidade}
            onChange={(e) => onChange({ cidade: e.target.value })}
            error={errors.cidade}
          />
        </div>
      </div>

      <div className={formStyles.btnRow}>
        <div className={formStyles.btnBackWrap}>
          <button className={formStyles.btnBack} onClick={onBack}>
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
        <button className={`${formStyles.btnPrimary} ${shake ? formStyles.shake : ''}`} onClick={onNext}>
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
