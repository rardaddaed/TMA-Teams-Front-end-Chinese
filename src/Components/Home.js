// Home.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem,Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../img/bg.jpg'

const Home = () => {
  const headerBGColor = '#C1A783';
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>


      <Box  
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Slogan
        </Typography>
        <Typography variant="body1" component="p">
          Some text describing our company or products.
        </Typography>
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '20%',
        right: '20%',
      }}
      >
        <Carousel >
            <div>
                <img src={img1} alt="Image 1" />
            </div>
            <div>
                <img src="img2.jpg" alt="Image 2" />
            </div>
            <div>
                <img src="img3.jpg" alt="Image 3" />
            </div>
        </Carousel>
        </Box>
    </div>
  );
};

export default Home;
