// Header and Footer
import React,{ useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Grid, Container, Popover, MenuItem } from '@mui/material';
import { AccountCircle, Notifications } from '@mui/icons-material';
import { LinkedIn, Facebook, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%',
      margin: 0,
    },
    
    App: {
      height: '100%',
    }
}));

const BG = () => {

  const classes = useStyles();
  const headerBGColor = '#C1A783';
  const footerBGColor = '#C1A783';
  const [anchorEl, setAnchorEl] = useState(null);
  const mainBGColor = '#74746C';

  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: headerBGColor }}>
        <Toolbar>
          <Box flexGrow={1}>
            <img src="" alt="Logo" />
          </Box>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton
            edge="end"
            aria-describedby="user-menu"
            onClick={handleMenuOpen}
            color="inherit"
            fontSize="large"
          >
            <AccountCircleIcon />
          </IconButton>
          <Popover
            id="user-menu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleMenuClose}>用户信息</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/">退出登录</MenuItem>
          </Popover>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        style={{ backgroundColor: mainBGColor }}
      >
        <Box flexGrow={1}>
          {/* Your page content goes here */}
        </Box>
      <AppBar position="static" style={{ backgroundColor: footerBGColor }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>1234-456-7890</Typography>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>TMA@mysite.com</Typography>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>Brisbane QLD, 4000</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>New Survey</Typography>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>View Survey</Typography>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>View Results</Typography>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>Account Preferences</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>Subscribe to Our Website</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{ fontFamily: 'SimSun, sans-serif' }}>Follow Us On:</Typography>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      </Box>
    </div>
  );
};

export default BG;
