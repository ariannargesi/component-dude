import { useState } from 'react';
import { ChevronRight } from 'react-feather';
import HtmlTree from '../HtmlTree';
import ActiveStyles from '../ActiveStyles';

import styles from './styles.module.sass';

const TreeAndStyles = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      style={{
        width: visible ? '300px' : '0',
        position: 'relative',
        borderRight: '1px solid lightgray',
      }}
    >
      {visible && (
        <>
          <HtmlTree />
          <ActiveStyles />
        </>
      )}
      <div
        className={styles.siderControl}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <ChevronRight />
      </div>
    </div>
  );
};

export default TreeAndStyles;
