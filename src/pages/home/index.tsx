import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import { DEFAULT_USERS_COUNT } from '../../api/constant';
import { Pagination } from '../../components/Pagination';
import { ErrorMessage } from '../../components/UI/ErrorMessage';
import { StartSearching } from '../../components/UI/StartSearching';
import { UserNotFound } from '../../components/UserNotFound';
import { UsersList } from '../../components/UsersList';
import { UserCard } from '../../components/UsersList/UserCard';
import { getParams } from '../../helpers/getQueryParams';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { selectSearch } from '../../store/search/selectors';
import { selectUsers } from '../../store/users/selectors';
import { fetchUsers } from '../../store/users/thunk';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const queryParamsPage = getParams().page;

  const [currentPage, setCurrentPage] = useState(+queryParamsPage);

  const { users, status, total_count } = useAppSelector(selectUsers);
  const { searchValue } = useAppSelector(selectSearch);

  const PAGE_COUNT = Math.ceil(total_count / DEFAULT_USERS_COUNT);

  const changePageNumber = (event: { selected: number }) => {
    const buttonNumber = event.selected;
    const gapNumberQueryParams = 1;

    setCurrentPage(buttonNumber + gapNumberQueryParams);
  };

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchUsers({ userLogin: searchValue, page: currentPage }));
    }
  }, [currentPage, searchValue]);

  useEffect(() => {
    if (searchValue) {
      setSearchParams({ userLogin: searchValue, page: String(currentPage) });
    }
  }, [searchValue, currentPage]);

  if (users.length === 0 && status === 'success') {
    return <UserNotFound />;
  }

  return (
    <>
      {status === 'loading' && <TopBarProgress />}
      {status === 'error' && <ErrorMessage />}
      {status === 'success' && (
        <div className={styles.wrapper}>
          <UsersList total_count={total_count}>
            {users.map(({ avatar_url, login, public_repos }) => (
              <UserCard public_repos={public_repos} key={login} avatar_url={avatar_url} login={login} />
            ))}
          </UsersList>
          {PAGE_COUNT > DEFAULT_USERS_COUNT && (
            <Pagination handlePageClick={changePageNumber} pageCount={PAGE_COUNT} currentPage={currentPage} />
          )}
        </div>
      )}
      {!status && <StartSearching />}
    </>
  );
};

export default Home;
