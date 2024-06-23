import { useState, useMemo, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeNewTaskPopupMode } from "../features/popupSliceMode";
import { updateSubTask, updateTaskStatus } from "../features/boardSlice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DotsMenu from "./DotsComponentMenuForEditTask";

export default function CurrentTaskAndPopup({ BoardButton, task }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardSlice);
  const childPopup = useSelector((state) => state.childPopupMode.value);

  const [anchorEl, setAnchorEl] = useState(null);

  const [currentTask, setCurrentTask] = useState(null);
  const [columnsName, setcolumnsName] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const currentBoard = boards.find((board) => board.selectedBoard) || boards[0];
  const handleClick = (event, task) => {
    setAnchorEl(event.currentTarget);

    setCurrentTask(task);

    dispatch(changeNewTaskPopupMode());
  };
  // const columnsInCurrentBoard = useMemo(() => {
  //   const value = (
  //     boards.find((ele) => ele.selectedBoard === true) || boards[0]
  //   ).columns.map((ele) => ele.name);
  //   setcolumnsName(value);
  // }, [currentBoard, currentTask]);

  const sendUpdatedSubTaskValue = (subtask) => {
    dispatch(
      updateSubTask([
        {
          title: subtask.title,
          isCompleted: !subtask.isCompleted,
        },
        currentTask.title,
        currentTask.status,
      ])
    );
  };
  const changeTaskStatus = (newStatus) => {
    setSelectedColumn(newStatus);
    dispatch(
      updateTaskStatus([
        {
          title: currentTask.title,
          description: currentTask.description,
          status: newStatus,
          subtasks: currentTask.subtasks,
        },
        { oldStatus: currentTask.status },
      ])
    );
  };

  const allTasks = useMemo(() => {
    return currentBoard.columns.reduce(
      (acc, column) => acc.concat(column.tasks),
      []
    );
  }, [currentBoard]);

  useEffect(() => {
    if (currentTask) {
      const updatedTask = allTasks.find(
        (task) => task.title === currentTask.title
      );
      if (updatedTask) {
        setCurrentTask(updatedTask);
      }
    }
  }, [boards]);

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changeNewTaskPopupMode());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {task.map((task, index) => (
        <Box
          tabIndex={index}
          key={index}
          onClick={(e) => handleClick(e, task)}
          sx={{
            marginTop: "10px",
            cursor: "pointer",
            backgroundColor: theme.palette.background.default,
            minHeight: "95px",
            padding: theme.spacing(1),
            borderRadius: "7px",
            fontSize: "16.5px",
            lineHeight: "25px",
            fontWeight: "700",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            textAlign: "left",

            color: theme.palette.text.primary,
          }}>
          {task.title}

          <Typography
            sx={{
              color: theme.palette.text.third,
              fontSize: "12.5px",
              fontWeight: "600",
              marginTop: "5px",
            }}>
            {task.subtasks.length === 0
              ? "No Subtasks"
              : `${task.subtasks.filter((ele) => ele.isCompleted).length} / ${
                  task.subtasks.length
                } Subtasks Completed`}
          </Typography>
        </Box>
      ))}
      {currentTask && (
        <Popover
          sx={{ zIndex: "15" }}
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
              transform: childPopup ? "scale(0)" : "scale(1)",
              width: "500px",
              transition: "transform 0.2s 0s ease-in-out",
            }}>
            <Stack>
              <Box>
                <Stack
                  direction={"row"}
                  alignItems={"baseline"}
                  justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                    }}
                    variant="h3"
                    fontSize={"19px"}
                    fontWeight={"bold"}>
                    {currentTask.title}
                  </Typography>
                  <DotsMenu
                    closeCurrentTask={handleClose}
                    currentTask={currentTask}
                  />
                </Stack>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography
                    sx={{
                      color: theme.palette.text.third,
                      fontSize: "12.5px",
                      fontWeight: "600",
                      marginTop: "5px",
                      marginBottom: "10px",
                    }}>
                    {currentTask.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.text.third,
                      fontSize: "12.5px",
                      fontWeight: "600",
                      marginTop: "5px",
                    }}>
                    {currentTask.subtasks.length === 0
                      ? "No Subtasks"
                      : `${
                          currentTask.subtasks.filter((ele) => ele.isCompleted)
                            .length
                        } / ${currentTask.subtasks.length} Subtasks Completed`}
                  </Typography>

                  <FormGroup>
                    {currentTask.subtasks.map((subtask) => (
                      <FormControlLabel
                        key={subtask.title}
                        sx={{
                          textDecoration: subtask.isCompleted
                            ? "line-through"
                            : "",
                          background: theme.palette.background.secondary,
                          marginTop: "8px",
                          marginLeft: "0 !important",
                          marginRight: "0 !important",
                          borderRadius: "5px",
                        }}
                        control={
                          <Checkbox
                            sx={{
                              color: "#828FA3",
                              "&.Mui-checked": {
                                color: "#635FC7",
                              },
                            }}
                            checked={subtask.isCompleted}
                            onChange={() => sendUpdatedSubTaskValue(subtask)}
                          />
                        }
                        label={subtask.title}
                      />
                    ))}
                  </FormGroup>
                </Box>
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
                  value={selectedColumn ? selectedColumn : currentTask.status}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: theme.palette.background.secondary,
                        color: theme.palette.text.primary, // Replace 'red' with your desired color
                      },
                    },
                  }}
                  onChange={(e) => changeTaskStatus(e.target.value)}
                  inputProps={{ "aria-label": "Without label" }}>
                  {currentBoard.columns.map((column) => (
                    <MenuItem key={column.name} value={column.name}>
                      {column.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
          </Box>
        </Popover>
      )}
    </div>
  );
}
