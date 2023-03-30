import React from 'react';
import { Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ' #EAEAEA',
    height: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width:'100%'
  },
  item:{
    padding: theme.spacing(2),
    marginLeft: '250px',
    marginRight: '30px',
    marginTop: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    height: '100% '
  },
  title:{
    marginLeft: '270px',
  }
}));


function Home(props){
  const classes = useStyles();

  
  return (
    <div className={classes.root}>
      <Toolbar />
      <h1 className={classes.title}>SCV功能没有实现</h1>
      <div className={classes.item}>
        <Button variant="contained" color="primary">
          {props.lanContent.HomeUpload}
        </Button>
        <Button variant="contained" color="primary">
          {props.lanContent.HomeDownload}
        </Button>
      </div>
    </div>
  );
}


export default Home;
