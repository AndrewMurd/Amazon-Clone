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

    const register = e => {
        e.preventDefault();

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
            .catch(error => alert(error.message))
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
                    <input type='text' value={firstName} onChange={e => setfirstName(e.target.value)} />

                    <h5>Last Name</h5>
                    <input type='text' value={lastName} onChange={e => setlastName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button onClick={register} className='signUp_registerButton'>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp