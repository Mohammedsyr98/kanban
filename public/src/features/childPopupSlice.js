import { createSlice } from "@reduxjs/toolkit";
export const childPopupMode = createSlice({
  name: "childPopup",
  initialState: {
    value: false,
  },
  reducers: {
    changechildPopupMode: (state, action) => {
      state.value = !state.value;
    },
  },
});
export const { changechildPopupMode } = childPopupMode.actions;
export default childPopupMode.reducer;
