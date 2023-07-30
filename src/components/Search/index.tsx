import { ChangeEvent, FC } from 'react';
import styles from './Search.module.css';

interface ISearch {
  handleChangeSearchValue: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<ISearch> = ({ handleChangeSearchValue, handleChangeInput }) => {
  return (
    <input
      onKeyDown={(e) => e.key === 'Enter' && handleChangeSearchValue}
      placeholder="Enter GitHub username"
      onChange={(e) => handleChangeInput(e)}
      type="text"
      className={styles.input}
    />
  );
};
