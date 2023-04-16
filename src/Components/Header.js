// Header and Footer
import React,{ useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Grid, Container, Popover, MenuItem } from '@mui/material';
import { AccountCircle, Notifications } from '@mui/icons-material';
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

const Header = () => {

  const classes = useStyles();
  const headerBGColor = '#C1A783';
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: headerBGColor }}>
        <Toolbar>
          <Box flexGrow={1}>
            <img src="public\Mindset_Academy_logo.png" alt="Logo" />
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
          <a href='/login' style={linkStyle}><Button color="inherit">登录</Button></a>
          <a href='/register' style={linkStyle}><Button color="inherit">注册</Button></a>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
