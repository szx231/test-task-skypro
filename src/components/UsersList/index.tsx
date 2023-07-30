import { FC, memo, ReactNode } from 'react';

import { useAppDispatch } from '../../store/redux-hooks';
import { sortToBigger, sortToDown } from '../../store/users/reducers';
import { Container } from '../Container';
import { Button } from '../UI/Button';
import styles from './UsersList.module.css';

type IUserList = {
  children: ReactNode;
  total_count: number;
};

export const UsersList: FC<IUserList> = memo(({ children, total_count }) => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <div className={styles.hero__wrapper}>
        <div className={styles.countUsers}>{`Всего найдено пользователей: ${total_count}`}</div>
        <div className={styles.buttonsWrapper}>
          <Button onclickFunction={() => dispatch(sortToBigger())} text="По возрастанию" />
          <Button onclickFunction={() => dispatch(sortToDown())} text="По убыванию" />
        </div>
        <div className={styles.hero}>{children}</div>
      </div>
    </Container>
  );
});
