import { memo, ReactNode } from 'react';

import styles from './CardList.module.css';

export const CardList = memo(({ children }: { children: ReactNode }) => {
  return <ul className={styles.card__list}>{children}</ul>;
});
