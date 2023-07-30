import cn from 'classnames';
import { FC, memo } from 'react';

import styles from './UserProfile.module.css';

type IUserProfile = {
  avatar: string;
  name: string;
  userName: string;
  followers: number;
  following: number;
  link: string;
};

export const UserProfile: FC<IUserProfile> = memo(({ avatar, name, userName, followers, following, link }) => {
  return (
    <section className={styles.user__profile}>
      <img src={avatar} alt={name} className={styles['user-profile__img']} />
      <h1 className={styles['user-profile__name']}>{name}</h1>
      <a href={link} target="_blank" className={styles['user-profile__descr']} rel="noreferrer">
        {userName}
      </a>
      <div className={styles['user-profile__social']}>
        <div className={cn(styles['user-profile__followers'], styles['user-profile-social__text'])}>
          {followers} followers
        </div>
        <div className={cn(styles['user-profile__following'], styles['user-profile-social__text'])}>
          {following} following
        </div>
      </div>
    </section>
  );
});
