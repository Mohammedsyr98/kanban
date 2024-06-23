import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab, Stack, Typography, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkMode } from "../features/darkmodeSlice";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link as RouterLink } from "react-router-dom";
import BasicPopover from "./NewBoardPopup";
import { useState } from "react";

export default function VerticalTabs({ hiddenSidebar, setHiddenSidebar }) {
  const darkModeState = useSelector((state) => state.darkModeState.value);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardSlice);
  const currentBoard =
    boards.find((ele) => ele.selectedBoard === true) || boards[0];
  const [value, setValue] = useState(boards.indexOf(currentBoard));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
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
                sx={{ margin: "0 10px 0 18px", fontSize: "20px" }}
              />
            }
            sx={{
              color:
                value === index ? "white !important" : "#828FA3 !important",
              background: value === index ? "#635FC7" : "",
              fontWeight: "700",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              minHeight: "48px",
              fontSize: "15px",
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

        <BasicPopover />
      </Tabs>

      <Box sx={{ marginTop: "45%" }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography color={theme.palette.text.primary}>Dark</Typography>
          <Switch
            sx={{ m: 1 }}
            onClick={() => dispatch(changeDarkMode())}
            checked={darkModeState}
          />
          <Typography color={theme.palette.text.primary}>Light</Typography>
        </Stack>

        <Tab
          label={"Hide Sidebar"}
          onClick={() => setHiddenSidebar(!hiddenSidebar)}
          icon={
            <VisibilityOffOutlinedIcon
              sx={{
                margin: "0 10px 0 18px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            />
          }
          sx={{
            color: "#828FA3",
            display: "flex",
            alignSelf: "flex-start",
            flexDirection: "row",
            justifyContent: "flex-start",
            minHeight: "48px",
            fontWeight: "700",
            width: "90%",
            padding: "13px",
            fontWeight: "600",
            borderBottomRightRadius: "9999px",
            borderTopRightRadius: "9999px",
            opacity: "1",
            "&:hover": {
              background: theme.palette.background.fourth,
              color: theme.palette.text.fourth,
            },
          }}
        />
      </Box>
    </Box>
  );
}
