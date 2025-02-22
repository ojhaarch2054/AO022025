import * as React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "./context/Context";
import { Sensor } from "../interfaces/sensorData";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import ChartView from "./ChartView";
import { useState } from "react";

//set drawer width
const drawerWidth = 280;

const Navbar = ({ sensorData }: { sensorData: Sensor[] }) => {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    isSmallScreen,
    chartClicked,
    clickedChartIndex,
    setChartClicked,
  } = useAppContext();

  //to manage the mobile drawer open/close status
  const [mobileOpen, setMobileOpen] = useState(false);
  //to manage if the drawer is in the process of closing
  const [isClosing, setIsClosing] = useState(false);
  //to manage the search dialog open/close status
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  //to toggle the mobile drawer open/close status
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  //to handle the click event for adding a new chart
  const addClickBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/add-chart");
  };
  //to handle the action of going back to the charts view
  const handleBackToCharts = () => {
    setChartClicked(false);
  };
  //to open the search dialog
  const handleSearchDialogOpen = () => {
    setOpenSearchDialog(true);
  };
  //to close the search dialog
  const handleSearchDialogClose = () => {
    setOpenSearchDialog(false);
  };
  //to handle changes in the search input field
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isSmallScreen && (
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <Typography variant="h6">Logoipsum</Typography>
            <Box>
              <IconButton onClick={handleSearchDialogOpen}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
          <Box>
            <Button
              variant="contained"
              onClick={addClickBtn}
              sx={{
                width: "75%",
                position: "absolute",
                marginTop: 89,
                marginLeft: 4,
              }}
            >
              + Add Chart
            </Button>
          </Box>
        </AppBar>
      )}

      {!isSmallScreen && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box>
            <Typography
              sx={{ marginBottom: 2, marginTop: 5, textAlign: "center" }}
              variant="h5"
            >
              Logoipsum
            </Typography>
            <TextField
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2, marginLeft: 3 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={addClickBtn}
              sx={{
                marginBottom: 2,
                marginLeft: 4,
                color: "white",
                backgroundColor: "blue",
                padding: 2,
                width: 200,
              }}
            >
              + Add Chart
            </Button>
          </Box>
          <LeftSideBar sensorData={sensorData} />
        </Drawer>
      )}

      {/*Conditional rendering for no chart message */}
      {sensorData.length === 0 && (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "gray", marginBottom: 4 }}
          >
            No charts created yet
          </Typography>
          <Button variant="contained" onClick={addClickBtn}>
            + Add Chart
          </Button>
        </Box>
      )}

      {/*for small screens, display either the sidebar or chart view */}
      {isSmallScreen && sensorData.length > 0 && (
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {!chartClicked ? (
            <LeftSideBar sensorData={sensorData} />
          ) : (
            <Box>
              <Button
                variant="contained"
                onClick={handleBackToCharts}
                sx={{ margin: 2 }}
              >
                Back to Charts
              </Button>
              {sensorData.length > 0 ? (
                <ChartView
                  sensorData={sensorData}
                  chartIndex={clickedChartIndex}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100%",
                    padding: 2,
                    boxSizing: "border-box",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "gray",
                      marginBottom: 4,
                    }}
                  >
                    No charts created yet
                  </Typography>
                  <Button variant="contained" onClick={addClickBtn}>
                    + Add Chart
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

      {/*for larger screens display the sidebar and chart view if a chart is clicked */}
      {!isSmallScreen && (
        <Box sx={{ flexGrow: 1 }}>
          {chartClicked && clickedChartIndex !== null ? (
            sensorData.length > 0 ? (
              <ChartView
                sensorData={sensorData}
                chartIndex={clickedChartIndex}
              />
            ) : (
              //no chart create message for larger screen
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  width: "100%",
                  padding: 2,
                  boxSizing: "border-box",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    marginBottom: 4,
                  }}
                >
                  No charts created yet
                </Typography>
                <Button variant="contained" onClick={addClickBtn}>
                  + Add Chart
                </Button>
              </Box>
            )
          ) : null}
        </Box>
      )}

      <Dialog open={openSearchDialog} onClose={handleSearchDialogClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
