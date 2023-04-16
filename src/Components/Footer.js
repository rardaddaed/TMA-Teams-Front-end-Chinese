// Header and Footer
import React,{ useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Grid, Container, Popover, MenuItem } from '@mui/material';
import { LinkedIn, Facebook, Twitter } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%',
      margin: 0,
    },
    
    App: {
      height: '100%',
    }
}));

const Footer = () => {

  const classes = useStyles();
  const footerBGColor = '#C1A783';
  const handleClick = (url) => {
    window.open(url, '_blank');
  };


  return (
    <div className={classes.root}>
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
              <IconButton color="inherit" onClick={() => handleClick('https://www.linkedin.com')}>
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" onClick={() => handleClick('https://www.twitter.com')}>
                <Facebook />
              </IconButton>
              <IconButton color="inherit" onClick={() => handleClick('https://www.facebook.com')}>
                <Twitter />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </div>
  );
};

export default Footer;
