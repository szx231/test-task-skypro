import { ChangeEvent, FC, ReactNode, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import githublogo from './img/githublogo.svg';
import { RoutePath } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { changeSearchValue, inputChangeValue } from '../../store/search/reducers';
import { Search } from '../Search';

type IHeader = {
  children?: ReactNode;
};

export const Header: FC<IHeader> = memo(({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { inputValue } = useAppSelector((state) => state.search);

  const handleChangeSearchValue = () => {
    dispatch(changeSearchValue(inputValue));

    if (inputValue) {
      navigate(RoutePath.Home);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(inputChangeValue(value));
  };

  return (
    <div className={styles.header__wrapper}>
      {children}
      <header className={styles.header}>
        <img draggable="false" src={githublogo} alt="githublogo" className={styles.header__logo} />
        <div className={styles.header__input}>
          <form onSubmit={(e) => e.preventDefault()} action="#">
            <Search handleChangeSearchValue={handleChangeSearchValue} handleChangeInput={handleChangeInput} />
            <button
              onClick={handleChangeSearchValue}
              type="submit"
              className={styles.header__loupe}
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </div>
  );
});
