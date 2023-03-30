import React from 'react'
import { useState, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Alert} from '@mui/material'
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";

function Register(props) {
    const emailElementRef = useRef();
    const passwordElementRef = useRef();

    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
    }

    // Handles registeration request, alerts error if error responded, navigates to volcano list if resgiteration suceeds
    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let item = { email: emailElementRef.current.value, password: passwordElementRef.current.value }
    //     const registerUrl = "http://sefdb02.qut.edu.au:3001/user/register";

    //     let result = await fetch(registerUrl, {
    //         method: 'POST',
    //         body: JSON.stringify(item),
    //         headers: {
    //             "accept": 'application/json',
    //             "Content-Type": 'application/json'
    //         }
    //     })
    //     result = await result.json();
    //     if (result.message === "User already exists") {
    //         setMessage("User already exists!")
    //     }
    //     else if (result.message === "Request body incomplete, both email and password are required") {
    //         setMessage("Please complete the registration form!")
    //     } else {
    //         navigate(`/volcanolist/`);
    //     }
    //     setOpen(true);
    // }

    // Returns registration form, obtains user info from textfield and alerts error if error responds
    return (
        <form onSubmit={handleSubmit}>
            <Card className='register-card' variant="outlined" >
                <div className='register-title'>
                    <h1>{props.lanContent.RegisterTitle}</h1>
                </div>

                <div className='register-form'>
                    <br />
                    <div className='first-row'>
                            <TextField label={props.lanContent.RegisterName} variant="outlined"
                            type="standard"
                            inputRef={emailElementRef}
                            className='name-field' />

                            <TextField label={props.lanContent.RegisterEmail}  variant="outlined"
                            type="email"
                            inputRef={emailElementRef}
                            className='email-field' />
                    </div>
                    <br />
                    <div className='second-row'>
                            <TextField label={props.lanContent.RegisterPassword}  variant="outlined"
                            type="password"
                            inputRef={passwordElementRef}
                            className='password-field' />
                    </div>
                </div>
                <Button type="submit" variant='contained'
                    className='submit-button'>{props.lanContent.RegisterButton}</Button>
                <Snackbar open={open} onClose={() => { setOpen(false) }}>
                   <Alert severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <h1 className='login-nav'>{props.lanContent.RegisterLoginMsg} 
                <a href="/login" className='login-nav-link'>{props.lanContent.RegisterLoginLink}</a></h1>
            </Card>
        </form>
    );

}

export default Register