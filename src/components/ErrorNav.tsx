import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Button, TextField, Drawer, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext } from "./context/Context";
import { useState } from 'react';

//set drawer width
const drawerWidth = 280;

const ErrorNav = () => {
  const {
    searchTerm,
    setSearchTerm,
    isSmallScreen
  } = useAppContext();

  //state to manage the search dialog visibility
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false); 
  //state to manage the drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  
  //to open the search dialog
  const handleSearchDialogOpen = () => {
    setIsSearchDialogOpen(true);
  };
  
  //to close the search dialog
  const handleSearchDialogClose = () => {
    setIsSearchDialogOpen(false);
  };
  
  //to toggle the drawer visibility
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", color: "black" }}>
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
            <Typography sx={{ marginBottom: 2, marginTop: 5, textAlign: "center" }} variant="h5">
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
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Typography sx={{ textAlign: "center" }}>No Chart</Typography>
        </Drawer>
      )}
      <Dialog open={isSearchDialogOpen} onClose={handleSearchDialogClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
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
          <Button onClick={handleSearchDialogClose}>Cancel</Button>
          <Button onClick={handleSearchDialogClose}>Search</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ErrorNav;