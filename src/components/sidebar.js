import lightlogo from "../logo-light.svg";
import darklogo from "../logo-dark.svg";
import VerticalTabs from "./sidebarTabs";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import DotsMenu from "./DotsComponentMenuForEditTask";
import { Box } from "@mui/material";
export default function Sidebar({ hiddenSidebar, setHiddenSidebar }) {
  const darkModeState = useSelector((state) => state.darkModeState.value);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          background: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.border.color}`,
          gridColumnStart: "1",

          gridRowStart: "1",
          gridRowEnd: "9",
          display: { xs: "none", md: "block" },
          overflow: "hidden",

          zIndex: "10",
        }}>
        <Box
          className="logo"
          sx={{
            mt: 4,
            ml: 5,
          }}>
          <img
            style={{ width: "11rem" }}
            src={darkModeState ? darklogo : lightlogo}
            alt="Logo"
          />
        </Box>
        <VerticalTabs
          hiddenSidebar={hiddenSidebar}
          setHiddenSidebar={setHiddenSidebar}
        />
        <DotsMenu />
      </Box>
    </>
  );
}
