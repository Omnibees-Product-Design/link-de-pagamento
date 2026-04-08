import { reservation } from '../../data/reservation';
import styles from './ReservationSummary.module.css';

export default function ReservationSummary() {
  return (
    <div className={styles.container}>
      <div className={styles.hotelInfo}>
        <h2 className={styles.hotelName}>{reservation.hotelName}</h2>
        <p className={styles.roomType}>{reservation.roomType}</p>
        <p className={styles.cancellation}>{reservation.cancellationNote}</p>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.detailLabel}>N&ordm; da Reserva</span>
          <span className={styles.detailValue}>{reservation.bookingNumber}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.detailLabel}>H&oacute;spede</span>
          <span className={styles.detailValue}>{reservation.guestName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.detailLabel}>Check-in | Check-out</span>
          <span className={styles.detailValue}>
            <strong>{reservation.checkIn} - {reservation.checkOut}</strong>
            <span className={styles.nights}> ({reservation.nights} noites)</span>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.detailLabel}>Valor</span>
          <span className={styles.detailValueBold}>{reservation.amount}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.detailLabel}>Taxas e impostos</span>
          <span className={styles.detailValueBold}>{reservation.taxesAndFees}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.detailLabel}>Parcelamento</span>
          <span className={styles.detailValueBold}>{reservation.installments}</span>
        </div>
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Total a Pagar</span>
        <span className={styles.totalValue}>{reservation.total}</span>
      </div>
    </div>
  );
}
