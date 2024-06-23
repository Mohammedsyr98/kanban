import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useTheme } from "@mui/material";
import { Stack } from "@mui/material";
import DeleteTask from "./ConfirmDeleteTaskPopup";
import EditTaskPopup from "./EditTaskPopup";
import { useSelector } from "react-redux";

export default function DotsMenu({
  currentTask,
  closeCurrentTask,
  setChildPopup,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const childPopup = useSelector((state) => state.childPopupMode.value);

  const theme = useTheme();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        borderRadius: "5px",
      }}>
      <IconButton
        aria-label="more"
        id="long-button"
        sx={{ color: theme.palette.text.third }}
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          opacity: childPopup ? "0" : "1",
        }}
        PaperProps={{
          style: {
            width: childPopup ? "0" : "20ch",
            background: theme.palette.background.default,
          },
        }}>
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          marginLeft={"7px"}
          gap={"15px"}
          fontSize={"15px"}
          fontWeight={"600"}>
          <EditTaskPopup
            currentTask={currentTask}
            closeDotsMenu={handleClose}
            closeCurrentTask={closeCurrentTask}
          />
          <DeleteTask
            currentTask={currentTask}
            closeDotsMenu={handleClose}
            childPopup={childPopup}
            closeCurrentTask={closeCurrentTask}
            setChildPopup={setChildPopup}
          />
        </Stack>
      </Menu>
    </div>
  );
}
