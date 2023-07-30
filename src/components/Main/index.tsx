import { ReactNode } from 'react';

import { Container } from '../Container';
import styles from './Main.module.css';

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className={styles.hero__wrapper}>
        <div className={styles.hero}>{children}</div>
      </div>
    </Container>
  );
};
