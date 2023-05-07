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
import Layout from './Layout';
import { AuthContext } from 'react-oauth2-code-pkce';


function UserInformation(props){
    const token = useContext(AuthContext);
    const userUrl = `https://tma.adp.au/User/`
    const [isEditing, setIsEditing] = useState({ name: false, email: false });
    const [userInfo, setUserInfo] = useState({
      name: 'user',
      email: '***@gmail.com',
    });
    const [tempInfo, setTempInfo] = useState({ name: '', email: '' });

    const handleEditClick = (field) => {
      setIsEditing({ ...isEditing, [field]: true });
      setTempInfo({ ...tempInfo, [field]: userInfo[field] });
      console.log({token})
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
      const res = await fetch(userUrl);
      const data = await res.json();
      setUserInfo(data[0].name, data[0].email);
    }
   }, [])

    return (
        <Layout>
        <Container>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography variant="h4" component="h1">
              用户信息
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {['name', 'email'].map((field, index) => (
                <Box key={field} marginBottom="2rem">
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ marginRight: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                  >
                    {field === 'name' && '姓名'}
                    {field === 'email' && '邮箱'}
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
              </Grid>
            </Grid>
        </Container>
        </Layout>
      );
      
};

export default UserInformation;
