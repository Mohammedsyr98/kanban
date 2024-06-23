import { useSelector } from "react-redux";

import lightlogo from "../logo-light.svg";
import darklogo from "../logo-dark.svg";
import BasicPopover from "./NewTaskPopup";

import { Typography, useTheme } from "@mui/material";

import { Box } from "@mui/material";
import DotsMenu from "./DotsComponentMenuForEditBoard";

export default function Header({ hiddenSidebar }) {
  const darkModeState = useSelector((state) => state.darkModeState.value);
  const boards = useSelector((state) => state.boardSlice);

  const currentBoard =
    boards.find((ele) => ele.selectedBoard === true) || boards[0];
  const theme = useTheme();

  return (
    <>
      <Box
        height={"15vh"}
        borderBottom={2}
        sx={{
          background: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.border.color}`,
          gridColumnStart: { xs: "1", md: "2" },
          gridColumnEnd: "6",

          gridRowStart: "1",
          display: "flex",
          alignItems: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            opacity: hiddenSidebar ? "1" : "0",
            borderRight: `1px solid ${theme.palette.border.color}`,
            padding: "0 20px",
            transition: "all 0.3s 300ms ease-out;",
          }}
          width={hiddenSidebar ? "max-content" : "0"}
          height={"100%"}>
          <img
            alt="logo"
            src={darkModeState ? darklogo : lightlogo}
            style={{ width: "11rem" }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: theme.palette.text.primary,
          }}
          variant="h1">
          {currentBoard ? currentBoard.name : "No Board Available"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: "1",
          }}>
          <BasicPopover />
          <DotsMenu />
        </Box>
      </Box>
    </>
  );
}
