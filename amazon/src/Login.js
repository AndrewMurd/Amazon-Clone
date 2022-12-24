import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [errorTxt, setErrorTxt] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/');
            })
            .catch(error => {
                if (!validateEmail(email)) {
                    setIsHidden(false);
                    setErrorTxt('You must enter a valid email :)');
                    return;
                } else if (password == '') {
                    setIsHidden(false);
                    setErrorTxt('You must enter a password :)');
                    return;
                } else {
                    setIsHidden(false);
                    setErrorTxt('There is no user record with this email and password.');
                }
            })
    }

    const changePage = () => {
        navigate('/signUp');
    }
 
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
            </Link>
            <div className='login_container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <h6 className={isHidden ? 'signUp_errorMsg_isHidden' : 'signUp_errorMsg_notHidden'}>{errorTxt}</h6>
                    <button onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>
                <p>By signing-in you agree to AMAZON-CLONE'S Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads</p>
                <button onClick={changePage} className='login_registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login