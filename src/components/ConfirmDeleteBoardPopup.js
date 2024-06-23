import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { changeNewBoardPopupMode } from "../features/popupSliceMode";
import { useNavigate } from "react-router-dom";
import { changechildPopupMode } from "../features/childPopupSlice";
import { deleteBoard } from "../features/boardSlice";

export default function DeleteBoard({ closeDotsMenu }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardSlice);
  const currentBoard =
    boards.find((ele) => ele.selectedBoard === true) || boards[0];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(changeNewBoardPopupMode());
    dispatch(changechildPopupMode());
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changeNewBoardPopupMode());
    closeDotsMenu();
    dispatch(changechildPopupMode());
  };

  const handleDelete = () => {
    dispatch(deleteBoard(currentBoard.name));
    navigate(
      `/${boards.length > 1 ? boards[1].name.split(" ").join("-") : ""}`
    );
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ zIndex: "15" }}>
      <ButtonBase
        onClick={handleClick}
        style={{
          color: "#EA5555",
        }}>
        Delete Board
      </ButtonBase>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              top: "50% !important",
              transform: "translate(-50%,-50%) !important ",
              left: "50% !important",
              borderRadius: "10px",
              width: "33rem",

              display: "flex",
              background: theme.palette.background.default,
              boxShadow: theme.palette.shadow.primary,
              scrollbarWidth: "none",
            },
          },
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", padding: "30px" }}>
          <Typography variant="h6" gutterBottom color={"#EA5555"}>
            Delete this Board?
          </Typography>
          <Typography
            lineHeight={"2.0"}
            variant="body2"
            gutterBottom
            color={"#828FA3"}>
            Are you sure you want to delete the "
            {currentBoard ? currentBoard.name : ""}" board ? This action will
            remove all columns and tasks and cannot be reversed.
          </Typography>
          <Stack
            justifyContent={"space-arround"}
            direction="row"
            spacing={2}
            mt={2}>
            <ButtonBase
              sx={{
                background: "#EA5555",
                color: "white",
                flexBasis: "50%",
                padding: "12px 0",
                borderRadius: "9999px",
              }}
              onClick={handleDelete}>
              Delete
            </ButtonBase>
            <ButtonBase
              sx={{
                background: theme.palette.background.fourth,
                color: "#635FC7",
                flexBasis: "50%",
                borderRadius: "9999px",
              }}
              onClick={handleClose}>
              Cancel
            </ButtonBase>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
