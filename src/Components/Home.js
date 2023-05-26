// Home.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../img/bg1.jpg'
import img2 from '../img/bg2.jpg'
import img3 from '../img/bg3.jpg'

const Home = () => {

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
          Slogan
        </Typography>
        <Typography variant="body1" component="p">
          Some text describing company or products.
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
            <img src={img2} alt="Image 2" />
          </div>
          <div>
            <img src={img3} alt="Image 3" />
          </div>
        </Carousel>
      </Box>
    </div>
  );
};

export default Home;
