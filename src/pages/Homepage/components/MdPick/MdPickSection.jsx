import { useMainData } from '../../../../hooks/useMainData';
import Alert from 'react-bootstrap/Alert';
import MdPickGrid from './MdPickGrid';
import cmmStyles from '../../HomePage.module.css';
import styles from './MdPick.module.css';

import { Link, useNavigate } from 'react-router-dom';

function MdPickSection() {
  const { data, isError, error } = useMainData();

  const navigate = useNavigate();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className={`${cmmStyles.section_item} ${styles.section_item}`}>
      <div className={`${cmmStyles.section_header} ${styles.section_header}`}>
        <h2 className={cmmStyles.section_title}>
          <span>MD Pick</span>
          이달의 특가 상품을 모았어요 🤩
        </h2>
      </div>
      <MdPickGrid />
    </div>
  );
}

export default MdPickSection;
