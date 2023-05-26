import React, { useContext, useEffect } from 'react';
import '../App.css';
import { AuthContext } from 'react-oauth2-code-pkce';

function Auth(props) {
  const { token, login } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      login();
    }
  }, [])

  return (
    <div className="success-container">
      <h1>{props.lanContent.Redirect}</h1>
    </div>
  );
}

export default Auth;
