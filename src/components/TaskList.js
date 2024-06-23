import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CircleIcon from "@mui/icons-material/Circle";
import CurrentTaskAndPopup from "./CurrentTaskAndPopup";
export default function TaskList({ task, color, columnName }) {
  return (
    <>
      <Grid item>
        <Box
          width={"290px"}
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: "10px",
          }}>
          <Stack alignItems={"center"} direction={"row"}>
            <CircleIcon
              sx={{
                width: "19px",
                color: columnName === "UNNAMED" ? "orange" : color,
                marginRight: "5px",
              }}
            />{" "}
            <Typography
              sx={{
                fontSize: "16px",
                color: "#828FA3",
                fontWeight: "bold",
                letterSpacing: "2.4px",
              }}
              variant="span">
              {columnName} ({task.length})
            </Typography>
          </Stack>
          <CurrentTaskAndPopup task={task} />
        </Box>
      </Grid>
    </>
  );
}
