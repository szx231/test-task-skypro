import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import { DEFAULT_REPOS_COUNT_PROFILE } from '../../api/constant';
import { Card } from '../../components/Card';
import { CardList } from '../../components/CardList';
import { Main } from '../../components/Main';
import { Pagination } from '../../components/Pagination';
import { ErrorMessage } from '../../components/UI/ErrorMessage';
import { RepositoryEmpty } from '../../components/UI/RepositoryEmpty';
import { UserProfile } from '../../components/UI/UserProfile';
import { UserRepositories } from '../../components/UserRepositories';
import { getParams } from '../../helpers/getQueryParams';
import { RoutePath } from '../../routes';
import { selectProfile } from '../../store/profile/selectors';
import { fetchProfile } from '../../store/profile/thunk';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, status } = useAppSelector(selectProfile);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const { id } = useParams() || '';
  const navigate = useNavigate();

  const queryParamsPage = getParams().page;
  const [currentPage, setCurrentPage] = useState(+queryParamsPage);

  const changePageNumber = (event: { selected: number }) => {
    const buttonNumber = event.selected;
    const gapNumberQueryParams = 1;

    setCurrentPage(buttonNumber + gapNumberQueryParams);
  };

  const PAGE_COUNT = useMemo(() => {
    if (status === 'success' && profile) {
      return Math.ceil(profile.userProfile.public_repos / DEFAULT_REPOS_COUNT_PROFILE);
    }
  }, [status]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfile({ userLogin: id, page: currentPage }));
    } else {
      navigate(RoutePath.Home);
    }
  }, [currentPage, id]);

  useEffect(() => {
    if (id) {
      setSearchParams({ page: String(currentPage) });
    }
  }, [id, currentPage]);

  return (
    <Main>
      {status === 'loading' && <TopBarProgress />}
      {status === 'error' && <ErrorMessage />}
      {status === 'success' && profile && (
        <>
          <UserProfile
            avatar={profile.userProfile.avatar_url}
            name={profile.userProfile.name}
            userName={profile.userProfile.login}
            link={profile.userProfile.html_url}
            followers={profile.userProfile.followers}
            following={profile.userProfile.following}
          />
          <UserRepositories title="Repositories" reposCount={profile.userProfile.public_repos}>
            {profile.userProfile.public_repos !== 0 && (
              <CardList>
                {profile.repos.map((user) => (
                  <Card
                    name={user.name}
                    link={user.html_url}
                    description={user.description || '!-------The author has not written a description yet---------!'}
                    key={user.html_url}
                  />
                ))}
              </CardList>
            )}
            {profile.userProfile.public_repos === 0 && <RepositoryEmpty />}
            {profile.userProfile.public_repos > DEFAULT_REPOS_COUNT_PROFILE && (
              <Pagination handlePageClick={changePageNumber} pageCount={PAGE_COUNT || 0} currentPage={currentPage} />
            )}
          </UserRepositories>
        </>
      )}
    </Main>
  );
};

export default Profile;
