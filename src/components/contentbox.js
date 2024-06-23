import { Box } from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectedBoard as selected, newColumn } from "../features/boardSlice";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import TaskList from "./TaskList";

export default function ContentBox() {
  const boards = useSelector((state) => state.boardSlice);
  const darkModeState = useSelector((state) => state.darkModeState.value);

  const dispatch = useDispatch();
  const { selectedBoard: selectedBoardParam } = useParams();

  const selectedBoard = boards.find(
    (board) => board.name === selectedBoardParam.split("-").join(" ")
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    height: "85px",
    padding: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
  }));

  useEffect(() => {
    if (selectedBoard && !selectedBoard.selectedBoard) {
      dispatch(selected(selectedBoard));
    }
  }, [selectedBoard, dispatch]);

  const colors = [
    "rgb(73, 196, 229)",
    "rgb(132, 113, 242)",
    "rgb(103, 226, 174)",
    "rgb(128, 0, 128)",
    "rgb(75, 192, 192)",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "85vh",
        overflow: "scroll",

        gridColumn: {
          xs: "1 / 6",
          md: "2 / 6",
        },

        background: theme.palette.background.secondary,
        "&::-webkit-scrollbar": {
          width: "16px",
          height: "16px",
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.scroll,
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#828FA3",
          borderRadius: "8px",
          aspectRatio: "1/4",
          "&:hover": {
            width: "20px",
          },
        },
      }}>
      <Grid
        height={"100%"}
        wrap="nowrap"
        sx={{ margin: "-14px 0" }}
        container
        width={"100vw"}
        spacing={3.5}>
        {selectedBoard &&
          selectedBoard.columns.map((column, index) => (
            <TaskList
              key={index}
              task={column.tasks}
              columnName={column.name.toUpperCase()}
              color={colors[index % colors.length]}
            />
          ))}

        <Grid item>
          <Box
            width={"280px"}
            sx={{
              display: "flex",
              flexDirection: "column",

              gap: "10px",
            }}>
            <Item
              onClick={() => dispatch(newColumn(selectedBoard.name))}
              sx={{
                height: isSmallScreen ? "360px" : "500px",
                cursor: "pointer",
                marginTop: "40px",
                color: theme.palette.text.third,
                fontSize: "30px",
                fontWeight: "bold",
                background: darkModeState
                  ? "linear-gradient(rgb(233, 239, 250) 0%, rgba(233, 239, 250, 0.5) 100%)"
                  : "linear-gradient(rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)",
              }}>
              + New Column
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
