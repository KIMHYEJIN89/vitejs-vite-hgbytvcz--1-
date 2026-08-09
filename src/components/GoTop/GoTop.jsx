import styles from './GoTop.module.css';
import useUIStore from '../../stores/useUIStore.js';
function GoTop() {
  const sheetHeight = useUIStore((state) => state.sheetHeight);
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.go_top} style={{ bottom: sheetHeight }}>
      <button type="button" onClick={goTop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default GoTop;
