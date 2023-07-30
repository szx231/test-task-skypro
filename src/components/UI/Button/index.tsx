import { FC } from 'react';

import styles from './Button.module.css';

type IButton = {
  text: string;
  onclickFunction: () => void;
};

export const Button: FC<IButton> = ({ text, onclickFunction }) => {
  return (
    <button onClick={onclickFunction} type="button" className={styles.button}>
      {text}
    </button>
  );
};
