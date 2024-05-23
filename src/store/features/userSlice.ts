import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserState {
  userList: UserProps[];
  perPage: number;
  page: number;
  total: number;
}

const initialState: UserState = {
  userList: [],
  perPage: 6,
  page: 1,
  total: 6,
};

export const settingSlice = createSlice({
  name: "useSlice",
  initialState,

  reducers: {
    setUserList: (state, action: PayloadAction<UserProps[]>) => {
      state.userList = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const getUserState = (state: RootState) => state.userSlice;
export const { setUserList, setPerPage, setPage, setTotal } =
  settingSlice.actions;

export default settingSlice.reducer;
