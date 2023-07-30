import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getParams } from '../../../helpers/getQueryParams';

interface Search {
  inputValue: string;
  searchValue: string;
}

const initialState: Search = {
  inputValue: '',
  searchValue: getParams().userLogin,
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    inputChangeValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearInput: (state) => {
      state.inputValue = '';
    },
  },
});

export const { inputChangeValue, clearInput, changeSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
