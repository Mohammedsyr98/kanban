import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { newTask } from "../features/boardSlice";
import { useState, useEffect } from "react";
import { Box, Stack, InputBase, ButtonBase } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import BasicPopover from "./NewBoardPopup";
import Select from "@mui/material/Select";

import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { changeNewTaskPopupMode } from "../features/popupSliceMode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@mui/material";

import { Tabs, Tab, Switch } from "@mui/material";
import { changeDarkMode } from "../features/darkmodeSlice";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { changechildPopupMode } from "../features/childPopupSlice";
import { Link as RouterLink } from "react-router-dom";

export default function MenuForMobile() {
  const darkModeState = useSelector((state) => state.darkModeState.value);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const boards = useSelector((state) => state.boardSlice);
  const childPopup = useSelector((state) => state.childPopupMode.value);
  const currentBoard =
    boards.find((ele) => ele.selectedBoard === true) || boards[0];
  const [value, setValue] = useState(boards.indexOf(currentBoard));
  const [menuOpened, setMenuOpened] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const handleClick = (event) => {
    if (boards.length > 0) {
      setAnchorEl(event.currentTarget);
      dispatch(changeNewTaskPopupMode());

      setMenuOpened(!menuOpened);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changeNewTaskPopupMode());
    setMenuOpened(!menuOpened);
  };
  const closeMainPop = () => {
    dispatch(changechildPopupMode());
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ zIndex: "15" }}>
      {menuOpened ? (
        <KeyboardArrowUpIcon
          style={{
            color: "#635FC7",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        />
      ) : (
        <KeyboardArrowDownIcon
          onClick={handleClick}
          style={{
            color: "#635FC7",
            fontWeight: "bold",
            cursor: "pointer",
          }}></KeyboardArrowDownIcon>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              top: "25% !important",
              transform: childPopup
                ? "translate(-50%,-50%) scale(0) !important"
                : "translate(-50%,-50%) scale(1) !important",
              left: "50% !important",
              borderRadius: "10px",
              width: "270px",

              background: "none",
              boxShadow: theme.palette.shadow.primary,
              scrollbarWidth: "none",
            },
          },
        }}>
        <Box
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: "13px",
              height: "100%",
            }}>
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ width: "90%" }}
              orientation="vertical"
              variant="scrollable"
              TabIndicatorProps={{ style: { display: "none" } }}>
              {boards.map((board, index) => (
                <Tab
                  key={board.name}
                  label={board.name}
                  component={RouterLink}
                  to={board.name.split(" ").join("-")}
                  icon={
                    <SpaceDashboardOutlinedIcon
                      sx={{ margin: "4px 10px 0 18px", fontSize: "20px" }}
                    />
                  }
                  sx={{
                    color:
                      value === index
                        ? "white !important"
                        : "#828FA3 !important",
                    background: value === index ? "#635FC7" : "",
                    fontWeight: "700",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    minHeight: "48px",

                    padding: "13px",
                    opacity: "1 !important",
                    borderBottomRightRadius: "9999px",
                    borderTopRightRadius: "9999px",
                    "&:hover":
                      value !== index
                        ? {
                            background: theme.palette.background.fourth,
                            color: `${theme.palette.text.fourth} !important`,
                          }
                        : {},
                  }}
                />
              ))}
              <Box onClick={closeMainPop}>
                <BasicPopover />
              </Box>
            </Tabs>

            <Box sx={{ marginTop: "45%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center">
                <Typography color={theme.palette.text.primary}>Dark</Typography>
                <Switch
                  sx={{ m: 1 }}
                  onClick={() => dispatch(changeDarkMode())}
                  checked={darkModeState}
                />
                <Typography color={theme.palette.text.primary}>
                  Light
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
