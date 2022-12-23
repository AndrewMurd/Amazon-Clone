import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ basket, user, firstName }, dispatch] = useStateValue();
    const [searchVal, setSearchVal] = useState();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    const callSearch = (value) => {
        dispatch({
            type: 'SET_SEARCH',
            value: value,
        })
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo'></img>
            </Link>

            <div className='header_search'>
                <input onChange={e => callSearch(e.target.value)} className='header_searchInput' type='text'></input>
                <SearchIcon className='header_searchIcon'></SearchIcon>
            </div>

            <div className='header_nav'>
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className='header_optionLineOne'>
                            Hello, {user ? firstName : 'Guest'}
                        </span>
                        <span className='header_optionLineTwo'>
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>
                            Returns
                        </span>
                        <span className='header_optionLineTwo'>
                            & Orders
                        </span>
                    </div>
                </Link>
                <Link to='/checkout'>
                    <div className='header_optionCart'>
                        <ShoppingCartIcon fontSize='medium'></ShoppingCartIcon>
                        <span className='header_optionLineTwo header_cartCount'>{basket.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
