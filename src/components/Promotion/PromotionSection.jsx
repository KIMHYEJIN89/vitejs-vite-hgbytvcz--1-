import { useMainData } from '../../hooks/useMainData';
import Alert from 'react-bootstrap/Alert';
import PromotionBanner from './PromotionBanner';
import PromotionGrid from './PromotionGrid';
import styles from './Promotion.module.css';

import { useNavigate, useParams } from 'react-router-dom';

function PromotionSection() {
  return (
    <div className={styles.section_item}>
      <PromotionBanner />
      <PromotionGrid />
    </div>
  );
}

export default PromotionSection;
