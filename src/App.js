import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'

//*测试使用
import Project from './Components/Project'
import Groups from './Components/Group'



import { Container } from '@mui/material';
import './App.css';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

import Translation from './Data.json';

// Create AppContext to prioritize Login state in nav bar
export const LoginContext = React.createContext({
  isLoggedIn: false
});

export const LanguageContext = React.createContext({
  language: "english"
});

// Get token state and parse into nav bar
export default function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);


  const [language, setLanguage] = useState("english");
  const [lanContent, setLanContent] = useState({});


  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');

    if (storedLanguage === "english"){
      setLanContent(Translation.english)
    } else if (storedLanguage === "chinese"){
      setLanContent(Translation.chinese)
    }
  })

  function handleSelectLanguage(newLanguage){
    setLanContent(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage)
  }


  return (
    <React.Fragment>
      <LoginContext.Provider value={!{ isLoggedIn }}>
        <div className='App'>
          <Router>
            <Navigation setIsLoggedIn={setIsLoggedIn}
                        language={language}
                        onLanguageChange={handleSelectLanguage}
                        lanContent={lanContent} 
                        />
            <Container maxWidth='md'>
              <Routes>
                <Route exact path="/" element={<Home lanContent={lanContent} />} />
                <Route path="/register" element={<Register lanContent={lanContent}/>} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} 
                                                     lanContent={lanContent}/>} />
                <Route path='/project' element={<Project />}/>
                <Route path='/group' element={<Groups />}/>
              </Routes>
            </Container>
          </Router>
        </div>
      </LoginContext.Provider> 

    </React.Fragment>
  );
}

