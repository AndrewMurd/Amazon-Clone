import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { useStateValue } from './StateProvider';
import { db } from './firebase';

function SignUp() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [errorTxt, setErrorTxt] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const register = e => {
        e.preventDefault();

        if (firstName == '') {
            setIsHidden(false);
            setErrorTxt('You must enter a first name :)');
            return;
        }

        if (lastName == '') {
            setIsHidden(false);
            setErrorTxt('You must enter a last name :)');
            return;
        }

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    navigate('/');
                }

                db
                    .collection('users')
                    .doc(auth.user.uid)
                    .set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    })
                dispatch({
                    type: 'SET_USER',
                    user: auth.user,
                })
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
                }
                setIsHidden(false);
                setErrorTxt(error.message);
            })
    }

    return (
        <div className='signUp'>
            <Link to='/'>
                <img className='signUp_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
            </Link>
            <div className='signUp_container'>
                <h1>Sign-Up</h1>
                <form>
                    <h5>First Name</h5>
                    <input className='signUp_firstNameInput' type='text' value={firstName} onChange={e => setfirstName(e.target.value)} />

                    <h5>Last Name</h5>
                    <input className='signUp_lastNameInput' type='text' value={lastName} onChange={e => setlastName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input className='signUp_emailInput' type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input className='signUp_passwordInput' type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <h6 className={isHidden ? 'signUp_errorMsg_isHidden' : 'signUp_errorMsg_notHidden'}>{errorTxt}</h6>
                    <button onClick={register} className='signUp_registerButton'>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp