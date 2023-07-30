import { ReactNode } from 'react';
import styles from './Main.module.css';
import { Container } from '../Container';

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className={styles.hero__wrapper}>
        <div className={styles.hero}>{children}</div>
      </div>
    </Container>
  );
};
