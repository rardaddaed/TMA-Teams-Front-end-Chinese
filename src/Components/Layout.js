// Layout.js
import React from 'react';
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
    </div>
  );
};

export default Layout;
