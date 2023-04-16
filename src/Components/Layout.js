// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const mainBGColor = '#74746C';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: mainBGColor,
      }}
    >
      <Header/>
      <div
        style={{
          marginTop: '100px',
          flexGrow: 1,
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
