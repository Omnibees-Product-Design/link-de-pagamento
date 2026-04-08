import Sidebar from './components/Sidebar/Sidebar';
import PaymentForm from './components/PaymentForm/PaymentForm';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <PaymentForm />
      </main>
    </div>
  );
}
