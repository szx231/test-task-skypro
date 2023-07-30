import { FC, memo, ReactNode } from 'react';

import styles from './UserRepositories.module.css';

type IUserRepositories = {
  title: string;
  reposCount: number;
  children: ReactNode;
};

export const UserRepositories: FC<IUserRepositories> = memo(({ title, reposCount, children }) => {
  return (
    <section className={styles.user__repositories}>
      <div className={styles['user-repositories__title']}>
        {title}({reposCount})
      </div>
      {children}
    </section>
  );
});
