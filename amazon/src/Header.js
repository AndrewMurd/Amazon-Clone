import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo'></img>
            </Link>

            <div className='header_search'>
                <input className='header_searchInput' type='text'>
                </input>

                <SearchIcon className='header_searchIcon'></SearchIcon>
            </div>

            <div className='header_nav'>
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className='header_optionLineOne'>
                        Hello {user ? user.email: 'Guest'}
                        </span>
                        <span className='header_optionLineTwo'> 
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <div className='header_option'>
                    <span className='header_optionLineOne'>
                        Returns
                    </span>
                    <span className='header_optionLineTwo'>
                        Orders
                    </span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>
                        Your
                    </span>
                    <span className='header_optionLineTwo'>
                        Prime
                    </span>
                </div>
                <Link to='/checkout'>
                    <div className='header_optionCart'>
                        <ShoppingCartIcon></ShoppingCartIcon>
                        <span className='header_optionLineTwo header_cartCount'>{basket.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
