import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home'
import Navigation from './Components/Navigation';
import CreateSurvey from './Components/CreateSurvey';
import DoSurvey from './Components/DoSurvey'
import DoSurveySuccess from './Components/DoSurveySucess';
import UserInformation from './Components/UserInformation'
import ViewSurveys from './Components/ViewSurveys';
import CreateSurveySucess from './Components/CreateSurveySuccess'
import SurveyResults from './Components/SurveyResults'
import Groups from './Components/ViewGroup';
import CreateGroupSuccess from './Components/CreateGroupSuccess'
import Auth from './Components/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';

import Translation from './Data.json';
import { AuthProvider } from 'react-oauth2-code-pkce';

export const LoginContext = React.createContext({
  isLoggedIn: false
});

export const LanguageContext = React.createContext({
  language: "english"
});

function generateState() {
  const crypto = require('crypto-browserify');
  return crypto.randomBytes(16).toString('hex');
}


const authUrl = 'https://hydra.adp.au/oauth2/auth';
const tokenUrl = 'https://hydra.adp.au/oauth2/token';
const logOutUrl = 'https://hydra.adp.au/oauth2/sessions/logout';
const state = generateState();

export default function App() {

  const [language, setLanguage] = useState("english");
  const [lanContent, setLanContent] = useState({});

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');

    if (storedLanguage === "english") {
      setLanContent(Translation.english)
    } else if (storedLanguage === "chinese") {
      setLanContent(Translation.chinese)
    } else {
      setLanContent(Translation.english)
    }
  })

  function handleSelectLanguage(newLanguage) {
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
    autoLogin: true,
    storage: 'session',
    logoutEndpoint: logOutUrl,
    logoutRedirect: 'http://localhost:3000/home',
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
              <Route exact path="/" element={<Auth lanContent={lanContent} />} />
              <Route exact path="/home" element={<Home lanContent={lanContent} />} />
              <Route path="/createsurvey" element={<CreateSurvey lanContent={lanContent} />} />
              <Route path="/createsurvey/:id" element={<CreateSurveySucess lanContent={lanContent} />} />
              <Route path="/dosurvey/:id" element={<DoSurvey lanContent={lanContent} />} />
              <Route path="/dosurvey/success" element={<DoSurveySuccess lanContent={lanContent} />} />
              <Route path="/profile" element={<UserInformation lanContent={lanContent} />} />
              <Route path="/viewsurvey" element={<ViewSurveys lanContent={lanContent} />} />
              <Route path="/viewsurvey/:id" element={<SurveyResults lanContent={lanContent} />} />
              <Route path="/groups" element={<Groups lanContent={lanContent} />} />
              <Route path="/groups/success" element={<CreateGroupSuccess lanContent={lanContent} />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </React.Fragment>
  );
}
