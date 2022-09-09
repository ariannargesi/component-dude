import styles from './styles.module.sass';
interface Props {
  color: string;
  onClick: (value) => void;
}

const ColorBox = (props: Props) => {
  const { color, onClick } = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <div style={{ background: color }} />
    </div>
  );
};

export default ColorBox;
