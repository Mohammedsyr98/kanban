import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { editTask } from "../features/boardSlice";
import { Box, Stack, InputBase, ButtonBase } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { changechildPopupMode } from "../features/childPopupSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditTaskPopup({
  currentTask,
  closeCurrentTask,
  setChildPopup,

  closeDotsMenu,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [columnsName, setcolumnsName] = useState([]);
  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [subTasks, SetSubTasks] = useState(currentTask.subtasks);

  const boards = useSelector((state) => state.boardSlice);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const columnsInCurrentBoard = (
    boards.find((ele) => ele.selectedBoard === true) || boards[0]
  ).columns;

  const selectedBoard = boards.find((ele) => ele.selectedBoard);

  const selectedBoardName =
    selectedBoard === undefined ? boards[0].name : selectedBoard.name;
  useEffect(() => {
    setcolumnsName(columnsInCurrentBoard[0].name);
  }, [selectedBoardName]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(changechildPopupMode());
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changechildPopupMode());
    closeDotsMenu();
  };
  const filterSubtasks = (value) => {
    const updatedSubtasks = subTasks.filter(
      (subtask, index) => index !== value
    );

    SetSubTasks(updatedSubtasks);
  };

  const handleSubtaskTitleChange = (id, value) => {
    const updateSubtasks = subTasks.map((subtask, index) =>
      index === id ? { ...subtask, title: value } : subtask
    );

    SetSubTasks(updateSubtasks);
  };

  const handleSaveTask = () => {
    if (title === null) {
      setTitle(false);
    } else {
      dispatch(changechildPopupMode());
      setAnchorEl(null);
      closeCurrentTask();
      const EditedTaskFromUser = {
        title,
        description,
        status: columnsName,
        subtasks: subTasks.filter((subtask) => subtask.title !== ""),
      };
      dispatch(editTask([EditedTaskFromUser, currentTask, selectedBoard]));
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

  return (
    <div style={{ zIndex: "15" }}>
      <ButtonBase
        onClick={handleClick}
        sx={{
          color: theme.palette.text.third,
        }}>
        Edit Task
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
            width: isSmallScreen ? "350px" : "500px",
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
                Edit Task
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
                onChange={(e) => {
                  const { value } = e.target;

                  setTitle(value);
                }}
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
                    onChange={(e) => {
                      handleSubtaskTitleChange(id, e.target.value);
                    }}
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
                  renderValue={
                    // React.useEffect(() => {
                    //   if (columnsName.length === 0) {
                    //     setcolumnsName(columnsInCurrentBoard[0].name);
                    //     setcolumnsName([columnsName]);
                    //     return () => columnsName;
                    //   } else {
                    //     setcolumnsName(columnsName);
                    //     return () => columnsName;
                    //   }
                    // }, [selectedBoard])
                    (selected) => {
                      if (selected.length === 0) {
                        setcolumnsName(columnsInCurrentBoard[0].name);
                      }

                      return selected;
                    }
                  }
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
