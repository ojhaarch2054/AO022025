import { Box, CssBaseline, Drawer, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const Navbar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
        <Typography
          sx={{ marginBottom: 2, marginTop: 5, textAlign: "center" }}
        >
          Logoipsum
        </Typography>
        {/*For input search field*/}
        <Box sx={{ margin: 2 }}>
          <TextField
            placeholder="Search..."
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;