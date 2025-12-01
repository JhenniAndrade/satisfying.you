import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // Lista de pesquisas
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchList: (state, action) => {
      state.list = action.payload;
    },
    addNewSearch: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setSearchList, addNewSearch } = searchSlice.actions;
export default searchSlice.reducer;