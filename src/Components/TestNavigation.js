import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Popover, MenuItem } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createSvgIcon } from '@mui/material/utils';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function TestNavigation() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className={classes.root}>
      {/*顶部导航*/}
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Typography variant="h3" className={classes.title} style={{marginLeft:"40px"}}>
            TMA
          </Typography>
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
        </Toolbar>
      </AppBar>

      {/*侧边导航栏*/}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{paper: classes.drawerPaper,}}
        >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="主页" />
            </ListItem>
            <ListItem button component={Link} to="/project">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="项目" />
            </ListItem>
            <ListItem button component={Link} to="/group">
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary="团队" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>

    </div>
  );
}

export default TestNavigation
