import { configureStore } from "@reduxjs/toolkit";
import darkModeState from "./features/darkmodeSlice";
import boardSlice from "./features/boardSlice";
import popupSliceMode from "./features/popupSliceMode";
import childPopupMode from "./features/childPopupSlice";

export default configureStore({
  reducer: { darkModeState, boardSlice, popupSliceMode, childPopupMode },
});
