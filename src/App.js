import './App.css';
import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home'
import Navigation from './Components/Navigation';
import CreateSurvey from './Components/CreateSurvey';
import CSV from './Components/CSV';
import UserInformation from './Components/UserInformation'
import CreateSurveySucess from './Components/CreateSurveySuccess'

import 'bootstrap/dist/css/bootstrap.min.css';

import Translation from './Data.json';
import { AuthContext, AuthProvider } from 'react-oauth2-code-pkce';

export const LoginContext = React.createContext({
  isLoggedIn: false
});

export const LanguageContext = React.createContext({
  language: "english"
});

function generateState(){
  const crypto = require('crypto-browserify');
  return crypto.randomBytes(16).toString('hex');
}

const authUrl = 'https://hydra.adp.au/oauth2/auth';
const tokenUrl = 'https://hydra.adp.au/oauth2/token';
const logOutUrl = 'https://hydra.adp.au/oauth2/logout';
const state = generateState();

export default function App() {

  const [language, setLanguage] = useState("english");
  const [lanContent, setLanContent] = useState({});

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');

    if (storedLanguage === "english"){
      setLanContent(Translation.english)
    } else if (storedLanguage === "chinese"){
      setLanContent(Translation.chinese)
    } else {
      setLanContent(Translation.english)
    }
  })

  function handleSelectLanguage(newLanguage){
    setLanContent(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage)
  }

const authConfig = {
    clientId: '2dac11ff-4039-4fec-b16e-a3216b82ba88',
    authorizationEndpoint: authUrl,
    tokenEndpoint: tokenUrl,
    redirectUri: 'http://localhost:3000/home',
    scope: 'openid offline profile email roles',
    state: state,
    autoLogin: false
}


  return (
    <React.Fragment>
      <AuthProvider authConfig={authConfig}>
        <div className='App'>
          <Router>
            <Navigation language={language}
                        onLanguageChange={handleSelectLanguage}
                        lanContent={lanContent} 
                        state={state}
                         />
              <Routes>
                <Route exact path="/home" element={<Home lanContent={lanContent} />} /> 
                <Route path="/createsurvey" element={<CreateSurvey lanContent={lanContent}/>}/>
                <Route path="/createsurvey/:id" element={<CreateSurveySucess lanContent={lanContent}/>}/>
                <Route path="/csv" element={<CSV lanContent={lanContent}/>}/>
                <Route path="/profile" element={<UserInformation/>} />
              </Routes>
          </Router>
        </div>
      </AuthProvider>/
    </React.Fragment>
  );
}
