import { createSlice } from "@reduxjs/toolkit";
export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false,
  },
  reducers: {
    changeDarkMode: (state, action) => {
      state.value = !state.value;
    },
  },
});
export const { changeDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
