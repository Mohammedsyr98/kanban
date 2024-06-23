import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { newTask } from "../features/boardSlice";
import { useState, useEffect } from "react";
import { Box, Stack, InputBase, ButtonBase } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { changeNewTaskPopupMode } from "../features/popupSliceMode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@mui/material";
export default function NewTaskPopup() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [columnsName, setcolumnsName] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [subTasks, SetSubTasks] = useState([
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ]);

  const boards = useSelector((state) => state.boardSlice);

  const columnsInCurrentBoard =
    boards.length > 0
      ? (boards.find((ele) => ele.selectedBoard) || boards[0]).columns
      : [];

  const selectedBoard = boards.find((ele) => ele.selectedBoard);

  const selectedBoardName = selectedBoard
    ? boards[0].name
    : "No Board Available";
  useEffect(() => {
    setcolumnsName(boards.length > 0 ? columnsInCurrentBoard[0].name : "");
  }, [selectedBoardName]);
  const handleClick = (event) => {
    if (boards.length > 0) {
      setAnchorEl(event.currentTarget);
      dispatch(changeNewTaskPopupMode());
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changeNewTaskPopupMode());
  };
  const filterSubtasks = (value) => {
    const updatedSubtasks = subTasks.filter(
      (subtask, index) => index !== value
    );

    SetSubTasks(updatedSubtasks);
  };

  const handleSubtaskTitleChange = (index, value) => {
    const newSubtasks = [...subTasks];
    newSubtasks[index].title = value;

    SetSubTasks(newSubtasks);
  };

  const handleSaveTask = () => {
    if (title === null) {
      setTitle(false);
    } else {
      setAnchorEl(null);
      dispatch(changeNewTaskPopupMode());
      const newTaskFromUser = {
        title,
        description,
        status: columnsName,
        subtasks: subTasks.filter((subtask) => subtask.title !== ""),
      };
      dispatch(newTask(newTaskFromUser));
      setTitle(null);
      setDescription("");
      setcolumnsName(columnsName);
      SetSubTasks([
        { title: "", isCompleted: false },
        { title: "", isCompleted: false },
      ]);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{ zIndex: "15" }}>
      <ButtonBase
        onClick={handleClick}
        style={{
          color: "white",
          background: "#635FC7",

          fontSize: isSmallScreen ? "20px" : "16px",
          padding: isSmallScreen ? "0px 18px 2.5px" : "0.9rem 1.5rem",
          borderRadius: "9999px",
          fontWeight: "bold",
        }}>
        {isSmallScreen ? "+" : "+ Add New Task"}
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
              scrollbarWidth: "none",
            },
          },
        }}>
        <Box
          sx={{
            p: 2,
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            padding: "32px",
            width: "500px",
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
                Add New Task
              </Typography>
              <Typography
                variant="span"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                Title
              </Typography>
              {/* title input */}
              <InputBase
                aria-label="Demo input"
                placeholder="e.g.Take Coffee Break"
                value={title === false ? "" : title}
                onFocus={() => setTitle(null)}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  width: "100%",
                  border: `1px solid ${
                    title === false ? "red" : "rgba(130, 143, 163, 0.25)"
                  } `,
                  borderRadius: "7px",
                  padding: "5px 0px 5px 15px",
                  marginTop: "10px",
                  input: {
                    "&::placeholder": {
                      color: theme.palette.text.primary,
                      opacity: "0.6",
                    },
                  },
                }}
                endAdornment={
                  title === false ? (
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "right",
                        marginRight: "15px",
                      }}>
                      Can't be empty
                    </Typography>
                  ) : (
                    ""
                  )
                }
              />
              <Typography
                variant="span"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                Description
              </Typography>
              {/* Description input */}
              <InputBase
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
                sx={{
                  width: "100%",
                  border: "1px solid rgba(130, 143, 163, 0.25) !important",
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
                rows={4}
              />

              <Box sx={{ marginTop: "25px" }}>
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}>
                  Subtasks
                </Typography>
                {/* subTasks */}
                {subTasks.map((subtask, id) => (
                  <InputBase
                    aria-label="Demo input"
                    key={id}
                    value={subTasks[id].title}
                    placeholder={
                      id === 0
                        ? "e.g. Take coffee break"
                        : id === 1
                        ? "e.g. Drink coffee and smile"
                        : id === 2
                        ? "You gonna make it"
                        : ""
                    }
                    onChange={(e) =>
                      handleSubtaskTitleChange(id, e.target.value)
                    }
                    endAdornment={
                      <DeleteIcon
                        onClick={() => filterSubtasks(id)}
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
                          opacity: "0.6",
                        },
                      },
                    }}
                  />
                ))}
                <ButtonBase
                  onClick={() =>
                    SetSubTasks([
                      ...subTasks,
                      {
                        title: "",
                        isCompleted: false,
                        id:
                          subTasks.length > 0
                            ? subTasks[subTasks.length - 1].id + 1
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
                    marginBottom: "20px",
                  }}>
                  + Add New Subtasks
                </ButtonBase>
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}>
                  Current Status
                </Typography>
                <Select
                  sx={{
                    width: "100%",

                    border: "1px solid rgba(130, 143, 163, 0.25)",
                    borderRadius: "7px",
                    padding: "5px 0px 5px 15px",

                    marginTop: "10px",
                    "& .MuiSelect-select": {
                      padding: "5px 0px 5px 0px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: theme.palette.background.secondary,
                        color: theme.palette.text.primary, // Replace 'red' with your desired color
                      },
                    },
                  }}
                  value={columnsName}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      setcolumnsName(columnsInCurrentBoard[0].name);
                    }

                    return selected;
                  }}
                  input={<OutlinedInput />}
                  onChange={(e) => setcolumnsName(e.target.value)}
                  inputProps={{ "aria-label": "Without label" }}>
                  {columnsInCurrentBoard.map((column) => (
                    <MenuItem key={column.name} value={column.name}>
                      {column.name}
                    </MenuItem>
                  ))}
                  <MenuItem value={"test"}></MenuItem>
                </Select>
                <ButtonBase
                  onClick={handleSaveTask}
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
