import React, { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import { validateEmail } from './reducer';

function SignUp() {
    const [{}, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [errorTxt, setErrorTxt] = useState('');

    // handle registration of new account to firebase
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
                const localStorageBasket = JSON.parse(localStorage.getItem('basket'));

                db
                    .collection('users')
                    .doc(auth.user.uid)
                    .set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        basket: localStorageBasket,
                    }, { merge: true });

                dispatch({
                    type: 'SET_USER',
                    user: auth.user,
                });

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