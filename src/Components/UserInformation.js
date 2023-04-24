// UserInformation.js
import React, { useState } from 'react';
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
const defaultAvatar = 'https://via.placeholder.com/150';

const UserInformation = () => {
    const [isEditing, setIsEditing] = useState({ name: false, phone: false, email: false });
    const [userInfo, setUserInfo] = useState({
      name: 'user',
      phone: '0123456',
      email: '***@gmail.com',
    });
    const [tempInfo, setTempInfo] = useState({ name: '', phone: '', email: '' });
  
    const [userAvatar, setUserAvatar] = useState(defaultAvatar);

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

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserAvatar(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

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
              {['name', 'phone', 'email'].map((field, index) => (
                <Box key={field} marginBottom="2rem">
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ marginRight: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                  >
                    {field === 'name' && '姓名'}
                    {field === 'phone' && '电话'}
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
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar alt="User Avatar" src={userAvatar} sx={{ width: 60, height: 60 }} />
                <Box marginTop="1rem">
                <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    hidden
                    onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                    <Button variant="contained" component="span">
                    Modify
                    </Button>
                </label>
                </Box>
            </Grid>
            </Grid>
        </Container>
        </Layout>
      );
      
};

export default UserInformation;
