import { Container } from '../Container';
import UserNoFound from './img/UserNotFound.svg';
import styles from './UserNotFound.module.css';

export const UserNotFound = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <img src={UserNoFound} className={styles.userNotFound__image} alt="User not found" />
        <h2 className={styles.userNotFound__text}>User not found</h2>
      </div>
    </Container>
  );
};
