import React from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';

function NavBar(){



    return(
        <div>
            <div className="header_container">
                <h1 className="heading1">LYNX Shopping</h1>
                <br/><br/><br/><br/>
            </div>
            <div className="navbar1">
                <Link to="/">Home</Link>
                <Link to="/items">Products</Link>
                <Link to="/cart"><i className="w3-xxlarge fa fa-shopping-cart"></i></Link>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    )


}

export default NavBar;