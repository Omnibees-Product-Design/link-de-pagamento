import FormField from '../FormField/FormField';
import styles from './PaymentForm.module.css';

export default function PaymentForm() {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Atualize os seus dados de pagamento</h1>
        <p className={styles.subtitle}>
          A reserva RES024562-12648 não foi cobrada. Para garantir sua reserva, atualize os seus dados de pagamento.
        </p>
      </div>

      <div className={styles.guestGreeting}>
        <h2 className={styles.guestName}>Alberto Roberto</h2>
        <p className={styles.guestMessage}>Seguem dados de sua reserva para pagamento.</p>
      </div>

      {/* Step 1 - Active */}
      <div className={styles.stepSection}>
        <div className={styles.stepHeader}>
          <span className={styles.stepNumberActive}>1.</span>
          <span className={styles.stepLabelActive}>Dados Pessoais</span>
        </div>

        <div className={styles.form}>
          <FormField label="Nome completo" placeholder="Nome completo" />
          <FormField label="E-mail" placeholder="E-mail" type="email" />
          <FormField label="País" placeholder="País" type="select" selectOptions={['Brasil', 'Portugal', 'Argentina']} />
          <FormField
            label="Telefone / Celular"
            placeholder=""
            type="phone"
            prefixOptions={['Selecione']}
          />
          <FormField
            label="Doc. de Identificação"
            placeholder=""
            type="document"
            prefixOptions={['CPF', 'CNPJ', 'Passaporte']}
          />

          <div className={styles.lastRow}>
            <div className={styles.dateField}>
              <FormField label="Data de nascimento" placeholder="Data de nascimento" type="date" />
            </div>
            <button className={styles.continueButton}>
              <span>Continuar</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2.5L9.5 7L5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Step 2 - Disabled */}
      <div className={styles.stepDisabled}>
        <span className={styles.stepNumberDisabled}>2.</span>
        <span className={styles.stepLabelDisabled}>Endereço</span>
      </div>

      {/* Step 3 - Disabled */}
      <div className={styles.stepDisabled}>
        <span className={styles.stepNumberDisabled}>3.</span>
        <span className={styles.stepLabelDisabled}>Dados de pagamento</span>
      </div>
    </div>
  );
}
