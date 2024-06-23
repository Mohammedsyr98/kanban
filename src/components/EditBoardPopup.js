import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box, Stack, InputBase, ButtonBase } from "@mui/material";

import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { changeNewBoardPopupMode } from "../features/popupSliceMode";
import { changechildPopupMode } from "../features/childPopupSlice";
import { editBoard } from "../features/boardSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
export default function EditBoard({ closeDotsMenu, setChildPopup }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const childPopup = useSelector((state) => state.childPopupMode.value);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const boards = useSelector((state) => state.boardSlice);
  const currentBoard =
    boards.find((ele) => ele.selectedBoard === true) || boards[0];

  const [anchorEl, setAnchorEl] = useState(null);
  const [columnsName, setcolumnsName] = useState(
    currentBoard ? currentBoard.columns : []
  );

  const [boardName, setBoardName] = useState(
    currentBoard ? currentBoard.name : []
  );
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    dispatch(changechildPopupMode());

    dispatch(changeNewBoardPopupMode());
  };

  const handleClose = () => {
    setAnchorEl(null);

    dispatch(changechildPopupMode());
    dispatch(changeNewBoardPopupMode());
    closeDotsMenu();
  };
  const filterColumns = (value) => {
    const updatedColumns = columnsName.filter((column, index) =>
      value !== index ? column : ""
    );
    setcolumnsName(updatedColumns);
  };

  const handleColumnNameChange = (index, value) => {
    const newColumnsName = [...columnsName];

    const updatedColumns = newColumnsName.map((column, i) =>
      i === index ? { ...column, name: value } : column
    );
    setcolumnsName(updatedColumns);
  };
  const sendNewBoardValues = () => {
    if (boardName !== "") {
      setAnchorEl(null);
      dispatch(changechildPopupMode());
      dispatch(changeNewBoardPopupMode());
      closeDotsMenu();
      navigate(`${boardName.split(" ").join("-")}`);
      const updatedBoardValue = {
        name: boardName,
        selectedBoard: true,
        columns: columnsName.map((column) => ({
          name: column.name,
          tasks: column.tasks ? column.tasks : [],
        })),
      };
      dispatch(editBoard(updatedBoardValue));
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ zIndex: "13" }}>
      <ButtonBase
        onClick={handleClick}
        sx={{
          color: theme.palette.text.third,
        }}>
        Edit Board
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
              background: "none",
              boxShadow: theme.palette.shadow.primary,
            },
          },
        }}>
        <Box
          sx={{
            p: 2,
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            padding: "32px",
            width: isSmallScreen ? "360px" : "500px",
          }}>
          <Stack>
            <Box>
              <Typography
                sx={{
                  marginBottom: "25px",
                }}
                variant="h3"
                fontSize={"19px"}
                fontWeight={"bold"}>
                Edit Board
              </Typography>
              <Typography
                variant="span"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                Board Name
              </Typography>
              <InputBase
                aria-label="Demo input"
                placeholder="e.g.Web Design"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                sx={{
                  width: "100%",
                  border: "1px solid rgba(130, 143, 163, 0.25)",
                  borderRadius: "7px",
                  padding: "5px 0px 5px 15px",
                  marginTop: "10px",
                  input: {
                    "&::placeholder": {
                      color: theme.palette.text.primary,
                      opacity: "0.7",
                    },
                  },
                }}
              />
              <Box sx={{ marginTop: "25px" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}>
                  Board Columns
                  {columnsName.map((column, id) => (
                    <InputBase
                      aria-label="Demo input"
                      key={id}
                      placeholder={
                        id === 0
                          ? "Todo"
                          : id === 1
                          ? "Doing"
                          : id === 2
                          ? "Done"
                          : ""
                      }
                      value={column.name}
                      onChange={(e) =>
                        handleColumnNameChange(id, e.target.value)
                      }
                      endAdornment={
                        <DeleteIcon
                          onClick={() => filterColumns(id)}
                          sx={{ cursor: "pointer" }}
                        />
                      }
                      sx={{
                        width: "100%",
                        border: "1px solid rgba(130, 143, 163, 0.25)",
                        borderRadius: "7px",
                        padding: "5px 15px ",
                        marginTop: "10px",
                        input: {
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: "0.7",
                          },
                        },
                      }}
                    />
                  ))}
                </Typography>
                <ButtonBase
                  onClick={() =>
                    setcolumnsName([
                      ...columnsName,
                      {
                        name: "",
                        id:
                          columnsName.length > 0
                            ? columnsName[columnsName.length - 1].id + 1
                            : 0,
                      },
                    ])
                  }
                  sx={{
                    width: "100%",
                    background: theme.palette.background.fourth,
                    color: theme.palette.text.fourth,
                    fontWeight: "700",
                    height: "40px",
                    borderRadius: "9999px",
                    marginTop: "10px",
                  }}>
                  + Add New Column
                </ButtonBase>

                <ButtonBase
                  onClick={sendNewBoardValues}
                  sx={{
                    width: "100%",
                    background: "#635FC7",
                    color: "white",
                    fontWeight: "700",
                    height: "40px",
                    borderRadius: "9999px",
                    marginTop: "15px",
                  }}>
                  Save Changes
                </ButtonBase>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
