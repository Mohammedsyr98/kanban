import { createSlice } from "@reduxjs/toolkit";
export const popupSliceMode = createSlice({
  name: "PopupMode",
  initialState: {
    newBoard: false,
    newTask: false,
  },
  reducers: {
    changeNewBoardPopupMode: (state, action) => {
      state.newBoard = !state.newBoard;
    },
    changeNewTaskPopupMode: (state, action) => {
      state.newTask = !state.newTask;
    },
  },
});
export const { changeNewBoardPopupMode, changeNewTaskPopupMode } =
  popupSliceMode.actions;
export default popupSliceMode.reducer;
