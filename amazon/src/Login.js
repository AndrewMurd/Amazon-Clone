import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/');
            })
            .catch(error => alert(error.message))
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

                    <button onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>
                <p>By signing-in you agree to AMAZON-CLONE'S Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads</p>
                <button onClick={changePage} className='login_registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login