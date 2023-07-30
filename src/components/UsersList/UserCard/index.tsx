import { FC, memo, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '../../../routes';
import styles from './UserCard.module.css';

type IUserCard = {
  avatar_url: string;
  login: string;
  public_repos: number;
};

export const UserCard: FC<IUserCard> = memo(({ avatar_url, login, public_repos }) => {
  const navigate = useNavigate();

  const redirectToProfile = (userLogin: string) => {
    startTransition(() => {
      navigate(`${RoutePath.Profile}/${userLogin}`);
    });
  };

  return (
    <button type="button" onClick={() => redirectToProfile(login)} className={styles.wrapper}>
      <img className={styles.avatar_url} src={avatar_url} alt={avatar_url} />
      <div className={styles.userLogin}>{`login: ${login}`}</div>
      <div className={styles.repos}>{`repoCount: ${public_repos}`}</div>
    </button>
  );
});
