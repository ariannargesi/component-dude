import Slider from '../Slider';
import useApplyStyle from '../../hooks/useApplyStyle';
import useStyleValue from '../../hooks/useStyleValue';
import { getNumbericValue } from '../../helper';
import { Text } from '../Styled';
import styles from '../Selectors/styles.module.sass';

const BorderRadius = () => {
  const applyStyle = useApplyStyle();
  const borderRadius = useStyleValue('borderRadius');

  return (
    <div className={styles.container}>
      <Text>Border radius</Text>
      <Slider
        value={getNumbericValue(borderRadius)}
        onChange={(value) => {
          applyStyle('borderRadius', value + 'px');
        }}
      />
    </div>
  );
};

export default BorderRadius;
