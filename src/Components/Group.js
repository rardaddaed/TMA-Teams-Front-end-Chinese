import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import TestNavigation from './TestNavigation';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ' #EAEAEA',
  },
  item:{
    padding: theme.spacing(2),
    marginLeft: '250px',
    marginRight: '30px',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
  },
  title:{
    marginLeft: '270px',
    marginBottom: '50px',
    marginTop: '60px',
  }
}));

const members = [
  { name: 'John Doe', position: 'Developer' },
  { name: 'Jane Doe', position: 'Designer' },
  { name: 'Mike Smith', position: 'Project Manager' },
  { name: 'Sarah Johnson', position: 'Marketing Specialist' },
];

function TestGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

        <h1 className={classes.title}>团队成员</h1>

        <List className={classes.item}>
            {members.map((member) => (
                <ListItem key={member.name}>
                <ListItemAvatar>
                    <Avatar>
                    <Person />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={member.position} />
                </ListItem>
            ))}
        </List>
    </div>
    
  );
}

export default TestGroup