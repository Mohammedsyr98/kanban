import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { newBoard } from "../features/boardSlice";
import { Tab, Box, Stack, InputBase, ButtonBase } from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeNewBoardPopupMode } from "../features/popupSliceMode";
import { useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function BasicPopover({ BoardButton }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnsName, setcolumnsName] = useState([
    { name: "Todo", id: 0 },
    { name: "Doing", id: 1 },
  ]);

  const [boardName, setBoardName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(changeNewBoardPopupMode());
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(changeNewBoardPopupMode());
  };
  const filterColumns = (value) => {
    const updatedColumns = columnsName.filter((column) =>
      value !== column.id ? column : ""
    );

    setcolumnsName(updatedColumns);
  };

  const handleColumnNameChange = (index, value) => {
    const newColumnsName = [...columnsName];
    newColumnsName[index].name = value;
    setcolumnsName(newColumnsName);
  };
  const sendNewBoardValues = () => {
    if (boardName !== "") {
      handleClose();
      setBoardName("");
      const newBoardValue = {
        name: boardName,
        selectedBoard: false,
        columns: columnsName
          .filter((ele) => ele.name !== "")
          .map((ele) => ({
            name: ele.name,
            tasks: [],
          })),
      };
      dispatch(newBoard(newBoardValue));
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ zIndex: "13" }}>
      <Tab
        label={"+ Create New Board"}
        onClick={handleClick}
        icon={
          <SpaceDashboardOutlinedIcon
            sx={{ margin: "0 10px 0 18px", fontSize: "20px" }}
          />
        }
        sx={{
          color: "#635FC7",

          width: "100%",
          display: "flex",
          marginTop: "10px",
          flexDirection: "row",
          justifyContent: "flex-start",
          minHeight: "48px",
          fontWeight: "700",
          padding: "13px",
          borderBottomRightRadius: "9999px",
          borderTopRightRadius: "9999px",
          opacity: "1",
          "&:hover": {
            background: theme.palette.background.fourth,
            color: theme.palette.text.fourth,
          },
        }}
      />

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
            width: isSmallScreen ? "365px" : "500px",
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
                Add New Board
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
                        handleColumnNameChange(column.id, e.target.value)
                      }
                      endAdornment={
                        <DeleteIcon
                          onClick={() => filterColumns(column.id)}
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
