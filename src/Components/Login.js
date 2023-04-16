import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

function Login(props) {
    const emailElementRef = useRef();
    const passwordElementRef = useRef();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const loginInfo = {email: "email@email", password: "123456"}

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailElementRef.current.value || !passwordElementRef.current.value){
            setMessage("Please complete the login form!");
        }
        else if (emailElementRef.current.value !== loginInfo.email || passwordElementRef.current.value !== loginInfo.password ){
            setMessage("Incorrect email or password!");
            
        } else {
            props.setIsLoggedIn(true);
            navigate(`/`);
        }
        setOpen(true)
    }

    // // Handles the login request, fetches from API and stores the JWT token or alerts messages if error responded
    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let item = {email: emailElementRef.current.value, password: passwordElementRef.current.value}
    //     const loginUrl = "http://sefdb02.qut.edu.au:3001/user/login"

    //     let result = await fetch(loginUrl, {
    //         method: 'POST',
    //         body: JSON.stringify(item),
    //         headers:{
    //             "accept" : 'application/json',
    //             "Content-Type" : 'application/json'
    //         }
    //     })
    //     result = await result.json();
    //     if (result.message === "Request body incomplete, both email and password are required"){
    //         setMessage("Please complete the login form!");
    //     } else if(result.message === "Incorrect email or password"){
    //         setMessage("Incorrect email or password!");
    //     } else {
    //         localStorage.setItem("token", result.token);
    //         props.setIsLoggedIn(true);
    //         navigate(`/volcanolist/`);
    //     }
    //     setOpen(true);
    // }

    // Returns the login form and obtains the login info from textfield, alerts error if error is responded
    return (
        <Layout>
        <form onSubmit={handleSubmit}>
            <Card className='login-card' variant="outlined" >
            <div  className='login-title'>
                <h1>{props.lanContent.LoginTitle}</h1>
            </div>

                <div className='login-form'>
                    <div className='email-field'>
                        <TextField label={props.lanContent.LoginEmail} variant="outlined" 
                        type="email"
                        inputRef={emailElementRef}/>
                    </div>
                    <br />
                    <div className='password-field'>
                        <TextField label={props.lanContent.LoginPassword} variant="outlined" 
                        type="password"
                        inputRef={passwordElementRef}/>
                    </div>
                    
                </div>


                <Button type="submit" variant='contained' component={Link} to="/home">{props.lanContent.LoginTitle}</Button>
                <Snackbar open={open} onClose={() => { setOpen(false) }}>
                   <Alert severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Card>
         </form>
         </Layout>
    );

}

export default Login