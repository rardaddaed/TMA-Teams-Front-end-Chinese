// UserInformation.js
import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  TextField,
  IconButton,
  Button,
  Avatar,
  Box,
  Grid,
  Container,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Layout from './Layout';
import { AuthContext } from 'react-oauth2-code-pkce';
import jwt_decode from 'jwt-decode';

//background color
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
    minHeight: '94vh',
  },
}));


function UserInformation(props){
    
    const authContext = useContext(AuthContext);
    const decodedToken = jwt_decode(authContext.idToken);
    const userID = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const userUrl = `https://tma.adp.au/User/${userID}`;

    const [isEditing, setIsEditing] = useState({ name: false, email: false });
    const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      role: ["Admin"],
    });
    const [tempInfo, setTempInfo] = useState({ name: '', email: '' });

    const handleEditClick = (field) => {
      setIsEditing({ ...isEditing, [field]: true });
      setTempInfo({ ...tempInfo, [field]: userInfo[field] });
    };
  
    const handleSave = (field) => {
      setIsEditing({ ...isEditing, [field]: false });
      setUserInfo({ ...userInfo, [field]: tempInfo[field] });
    };
  
    const handleChange = (field, value) => {
      setTempInfo({ ...tempInfo, [field]: value });
    };
  
    const handleKeyPress = (e, field) => {
      if (e.key === 'Enter') {
        handleSave(field);
      }
    };

    useEffect(() => {
      const fetchUserInfo = async () => {
        const res = await fetch(userUrl, {headers: {
          "accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${authContext.token}`
        }});
        const data = await res.json();
        setUserInfo({
          name: data.displayName,
          email: data.email,
          role: userInfo.role,
        });
      }
  
      fetchUserInfo();
     }, [userUrl])
     
     const handleSubmit = async (e) => {
      e.preventDefault();
      const body = {
        email: userInfo.email,
        displayName: userInfo.name,
        roles: userInfo.role,
      }

      let result = await fetch(userUrl, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          "accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${authContext.token}`
        }
      })
        if (result.ok){
          result = await result.json();
        }
     }

   //background color
   const classes = useStyles();
    return (
      <div className={classes.root}>
        <Container style={{ paddingTop: 50}} >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography variant="h4" component="h1">
              {props.lanContent.ProfileTitle}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box marginBottom="2rem">
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ marginRight: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                    >{props.lanContent.ProfileRole}</Typography>

              <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {userInfo.role}
                    </Typography>
              </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {['name', 'email'].map((field, index) => (
                <Box key={field} marginBottom="2rem">
                  
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ marginRight: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                  >
                    {field === 'name' && props.lanContent.ProfileName}
                    {field === 'email' && props.lanContent.ProfileEmail}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {userInfo[field]}
                    </Typography>
                    {isEditing[field] ? (
                <TextField
                value={tempInfo[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, field)}
                onBlur={() => setIsEditing({ ...isEditing, [field]: false })}
              />
              
              ) : (
                <IconButton onClick={() => handleEditClick(field)}>
                  <EditIcon />
                </IconButton>
              )}
                  </Box>
                </Box>
              ))}
              <Button type="submit"  variant="contained" color="primary" disabled={!userInfo.name || !userInfo.email} onClick={handleSubmit}>
                 {props.lanContent.ProfileSave}
            </Button>
              </Grid>
            </Grid>
        </Container>
      </div>
      );
      
};

export default UserInformation;
