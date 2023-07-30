import { memo, FC } from 'react';
import styles from './Card.module.css';

type ICard = {
  name: string;
  description: string;
  link: string;
};

export const Card: FC<ICard> = memo(({ name, description, link }) => {
  return (
    <div className={styles['user-card__wrap']}>
      <li className={styles.user__card}>
        <a href={link} target="_blank" rel="noreferrer">
          <div className={styles['user-card__title']}>{name}</div>
        </a>
        <div className={styles['user-card__descr']}>{description}</div>
      </li>
    </div>
  );
});
