import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data.json";
const localStorageKey = "boards";

const getInitialState = () => {
  const storedState = localStorage.getItem(localStorageKey);
  return storedState ? JSON.parse(storedState) : data.boards;
};
export const boardSlice = createSlice({
  name: "boards",
  initialState: getInitialState(),
  reducers: {
    selectedBoard: (state, action) => {
      const updatedBoards = state.map((board) =>
        board.name === action.payload.name
          ? { ...board, selectedBoard: true }
          : { ...board, selectedBoard: false }
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedBoards));
      return updatedBoards;
    },
    newColumn: (state, action) => {
      const updatedColumns = current(state).map((board, index) =>
        board.name === action.payload
          ? {
              ...board,
              columns: [...board.columns, { name: "Unnamed", tasks: [] }],
            }
          : { ...board }
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedColumns));
      return updatedColumns;
    },
    newBoard: (state, action) => {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([...current(state), action.payload])
      );
      return [...current(state), action.payload];
    },
    newTask: (state, action) => {
      const newTaskFromUser = action.payload;
      const selectedBoard =
        state.find((board) => board.selectedBoard) || state[0];

      const selectedColumn = selectedBoard.columns.find(
        (column) => column.name === newTaskFromUser.status
      );

      const updatedColumn = {
        ...selectedColumn,
        tasks: [...selectedColumn.tasks, newTaskFromUser],
      };

      const updatedColumns = selectedBoard.columns.map((column) =>
        column.name === updatedColumn.name ? updatedColumn : column
      );

      const updatedBoard = {
        ...selectedBoard,
        columns: updatedColumns,
      };

      const updatedState = current(state).map((board) =>
        board.name === updatedBoard.name ? updatedBoard : board
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
    updateSubTask: (state, action) => {
      const newStateForSubTask = action.payload[0].isCompleted;
      const selectedBoard =
        state.find((board) => board.selectedBoard) || state[0];
      const updatedColumnsInSelectedBoard = selectedBoard.columns.map(
        (column) =>
          column.name === action.payload[2]
            ? {
                ...column,
                tasks: column.tasks.map((task) =>
                  task.title === action.payload[1]
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                          subtask.title === action.payload[0].title
                            ? { ...subtask, isCompleted: newStateForSubTask }
                            : subtask
                        ),
                      }
                    : task
                ),
              }
            : column
      );
      const updatedSelectedBoard = {
        ...selectedBoard,
        columns: updatedColumnsInSelectedBoard,
      };
      const updatedState = current(state).map((board) =>
        board.name === updatedSelectedBoard.name ? updatedSelectedBoard : board
      );

      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
    updateTaskStatus: (state, action) => {
      const newTask = action.payload[0];
      const oldStatus = action.payload[1].oldStatus;
      const newStatus = newTask.status;

      // Find the selected board, default to the first board if none are selected
      const selectedBoard =
        current(state).find((board) => board.selectedBoard) ||
        current(state)[0];

      // Remove the task from the old status column and add it to the new status column
      const updatedColumns = selectedBoard.columns.map((column) => {
        if (column.name === oldStatus) {
          // Remove task from old status column
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.title !== newTask.title),
          };
        } else if (column.name === newStatus) {
          // Add task to new status column
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      // Update the state with the modified board columns
      const updatedState = state.map((board) =>
        board.name === selectedBoard.name
          ? { ...selectedBoard, columns: updatedColumns }
          : board
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
    deleteTask: (state, action) => {
      const selectedBoard = action.payload[1];
      const selectedTaskTitle = action.payload[0].title;
      const selectedTaskStatus = action.payload[0].status;
      const updatedState = current(state).map((board) =>
        board.name === selectedBoard.name
          ? {
              ...selectedBoard,
              columns: selectedBoard.columns.map((column) =>
                column.name === selectedTaskStatus
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) =>
                        task.title === selectedTaskTitle ? "" : task
                      ),
                    }
                  : column
              ),
            }
          : board
      );

      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
    editTask: (state, action) => {
      const taskBeforeEdited = action.payload[1];
      const taskAfterEdited = action.payload[0];
      const selectedBoard = action.payload[2];
      const updatedSelectedBoard = selectedBoard.columns.map((column) => {
        if (column.name === taskBeforeEdited.status) {
          if (column.name !== taskAfterEdited.status) {
            return {
              ...column,
              tasks: column.tasks.filter((task) =>
                task.title === taskBeforeEdited.title ? "" : task
              ),
            };
          } else {
            return {
              ...column,
              tasks: column.tasks.map((task) =>
                task.title === taskBeforeEdited.title ? taskAfterEdited : task
              ),
            };
          }
        } else {
          if (column.name === taskAfterEdited.status) {
            return {
              ...column,
              tasks: [...column.tasks, taskAfterEdited],
            };
          } else {
            return column;
          }
        }
      });
      const updatedState = current(state).map((board) =>
        board.name === selectedBoard.name
          ? { ...selectedBoard, columns: updatedSelectedBoard }
          : board
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
    editBoard: (state, action) => {
      const editedBoard = action.payload;
      const selectedBoard =
        current(state).find((board) => board.selectedBoard) ||
        current(state)[0];

      const updatedBoards = current(state).map((board) =>
        board.name === selectedBoard.name ? editedBoard : board
      );

      localStorage.setItem(localStorageKey, JSON.stringify(updatedBoards));
      return updatedBoards;
    },
    deleteBoard: (state, action) => {
      const deleteBoardName = action.payload;
      const updatedState = current(state).filter(
        (board) => board.name !== deleteBoardName
      );
      localStorage.setItem(localStorageKey, JSON.stringify(updatedState));
      return updatedState;
    },
  },
});
export const {
  selectedBoard,
  editBoard,
  newColumn,
  newBoard,
  newTask,
  updateSubTask,
  updateTaskStatus,
  deleteTask,
  editTask,
  deleteBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
