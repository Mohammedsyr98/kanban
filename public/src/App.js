import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
// Components
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ContentBox from "./components/contentbox";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useEffect } from "react";

function App() {
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const darkModeState = useSelector((state) => state.darkModeState.value);
  const newBoardPopupModeState = useSelector(
    (state) => state.popupSliceMode.newBoard
  );
  const newTaskPopupModeState = useSelector(
    (state) => state.popupSliceMode.newTask
  );

  const boards = useSelector((state) => state.boardSlice);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(darkModeState
            ? {
                // Dark mode palette
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#ff5722",
                },
                // Dark mode specific colors
                background: {
                  default: "white",
                  secondary: "#F4F7FD",
                  fourth: "rgba(99, 95, 199, 0.1)",
                },
                text: {
                  primary: "#2B2C37",
                  secondary: "#2B2C37",
                  third: "#828FA3",
                  fourth: "#635FC7",
                  scroll: "#f0eaea",
                },
                shadow: {
                  primary:
                    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
                },
                border: {
                  color: "#E4EBFA",
                },
              }
            : {
                // Light mode palette
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#ff5722",
                },
                // Light mode specific colors
                text: {
                  primary: "#fff ",
                  third: "#828FA3",
                  fourth: "#635FC7",
                },
                background: {
                  default: "#2B2C37",
                  secondary: "#20212C",
                  third: "#F4F7FD",
                  fourth: "white",
                  scroll: "#373841",
                },
                shadow: {
                  primary:
                    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
                },
                border: {
                  color: "#3E3F4E",
                },
              }),
        },
      }),
    [darkModeState]
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "grid",
          transition: "all 0.3s ease-in-out",
          gridTemplateColumns: hiddenSidebar ? "0%" : "23%",
        }}>
        <Sidebar
          hiddenSidebar={hiddenSidebar}
          setHiddenSidebar={setHiddenSidebar}
        />

        {hiddenSidebar ? (
          <IconButton
            onClick={() => setHiddenSidebar(!hiddenSidebar)}
            sx={{
              background: "#635FC7",
              position: "absolute",
              left: "0",
              top: "76%",
              zIndex: "0",
              width: "60px",
              height: "50px",
              borderBottomRightRadius: "9999px",
              borderTopRightRadius: "9999px",
              transition: "left 0.3s ease, opacity 0.3s ease-in-out",
              opacity: 1,
              "&:hover": {
                background: "#a8a4ff ",
              },
              "&.hidden": {
                left: "-60px",
                opacity: 0,
              },
            }}
            aria-label="delete">
            <VisibilityOutlinedIcon />
          </IconButton>
        ) : (
          ""
        )}

        <Header hiddenSidebar={hiddenSidebar} />

        <Routes>
          <Route
            path="/"
            element={
              boards.length > 0 ? (
                <Navigate to={`/${boards[0].name.split(" ").join("-")}`} />
              ) : (
                <Box
                  sx={{
                    gridColumnStart: "2",
                    gridColumnEnd: "6",
                    width: "100%",
                    height: "85vh",
                    background: theme.palette.background.secondary,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Typography
                    sx={{
                      color: theme.palette.text.third,
                      fontSize: "20px",
                    }}>
                    No tasks available. Please create a board first
                  </Typography>
                </Box>
              )
            }
          />
          <Route path="/:selectedBoard?" element={<ContentBox />} />
        </Routes>
        {newBoardPopupModeState ? (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.48)",
              height: "100vh",
              width: "100vw",
              zIndex: "11",
              position: "absolute",
            }}></div>
        ) : (
          ""
        )}

        {newTaskPopupModeState ? (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.48)",
              height: "100vh",
              width: "100vw",
              zIndex: "11",
              position: "absolute",
            }}></div>
        ) : (
          ""
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
