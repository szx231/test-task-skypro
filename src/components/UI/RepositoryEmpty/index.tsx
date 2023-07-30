import listEmpty from './img/listEmpty.png';
import styles from './RepositoryEmpty.module.css';

export const RepositoryEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.repositoryEmpty__image} src={listEmpty} alt="User Repositories Empty" />
      <span className={styles.repositoryEmpty__text}>Repository list is empty</span>
    </div>
  );
};
