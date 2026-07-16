import { useEffect, useRef, useState } from 'react';
import { reservation } from '../../data/reservation';
import SecurityBadges from '../SecurityBadges/SecurityBadges';
import styles from './Sidebar.module.css';

const LANGUAGES = [
  { flag: 'br', code: 'PT', label: 'Português BR' },
  { flag: 'pt', code: 'PT', label: 'Português PT' },
  { flag: 'us', code: 'EN', label: 'English' },
  { flag: 'es', code: 'ES', label: 'Español' },
];

/**
 * Painel esquerdo, partilhado pelos dois fluxos — porta .panel-left
 * (prototypes/v3.html): logo + selector de idioma, informação do hotel
 * (colapsável só em mobile), preço e selos de segurança.
 */
export default function Sidebar() {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [hotelOpen, setHotelOpen] = useState(false); // só relevante em mobile
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    function onDoc(e: MouseEvent) {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [langOpen]);

  return (
    <aside className={`${styles.sidebar} glass-card`}>
      <div className={styles.logoRow}>
        <img src="/bee2pay-logo.png" alt="Bee2Pay" className={styles.logoImg} onError={(e) => (e.currentTarget.style.display = 'none')} />

        <div className={styles.langWrap} ref={langRef}>
          <div
            className={`${styles.langSelector} ${langOpen ? styles.open : ''}`}
            onClick={() => setLangOpen((v) => !v)}
          >
            <span className={`fi fi-${lang.flag} ${styles.flag}`} />
            <span>{lang.code}</span>
            <svg className={styles.chevron} width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          {langOpen && (
            <div className={styles.langDropdown}>
              {LANGUAGES.map((l) => (
                <div
                  key={l.flag}
                  className={`${styles.langOption} ${l.flag === lang.flag ? styles.selected : ''}`}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                >
                  <span className={`fi fi-${l.flag} ${styles.flag}`} /> {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.hotelSection} ${hotelOpen ? styles.open : ''}`}>
        <div className={styles.hotelHeader} onClick={() => setHotelOpen((v) => !v)}>
          <div className={styles.hotelName}>{reservation.hotelName}</div>
          <svg className={styles.hotelChevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className={styles.hotelCollapsible}>
          <div className={styles.hotelRoom}>{reservation.roomType}</div>
          <div className={styles.hotelCancel}>
            <svg viewBox="0 0 12 12" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
              <circle cx="6" cy="6" r="5.25" stroke="#34D399" strokeWidth="1.5" />
              <path d="M3.5 6L5.2 7.8L8.5 4.5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {reservation.cancellationNote}
          </div>

          <div className={styles.divider} />

          <div className={styles.reservationTable}>
            <div className={styles.resRow}>
              <span className={styles.resLabel}>Hóspede</span>
              <span className={styles.resValue}>{reservation.guestName}</span>
            </div>
            <div className={styles.resRow}>
              <span className={styles.resLabel}>Reserva</span>
              <span className={styles.resValue}>{reservation.bookingNumber}</span>
            </div>
            <div className={styles.resRow}>
              <span className={styles.resLabel}>Check-in</span>
              <span className={styles.resValue}>{reservation.checkIn}</span>
            </div>
            <div className={styles.resRow}>
              <span className={styles.resLabel}>Check-out</span>
              <span className={styles.resValue}>{reservation.checkOut}</span>
            </div>
            <div className={styles.resRow}>
              <span className={styles.resLabel}>Período</span>
              <span className={styles.resValue}>{reservation.nights} noites</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Hospedagem</span>
          <span className={styles.priceValue}>{reservation.amount}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Taxas e encargos</span>
          <span className={styles.priceValue}>{reservation.taxesAndFees}</span>
        </div>
        <div className={styles.priceTotalRow}>
          <span className={styles.priceTotalLabel}>Total</span>
          <span className={styles.priceTotalValue}>{reservation.total}</span>
        </div>
      </div>

      <SecurityBadges />
    </aside>
  );
}
