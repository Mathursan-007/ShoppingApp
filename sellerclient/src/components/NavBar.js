import React from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

class NavBar extends React.Component {


    state={
        user:''
    }

    doLogout() {

        localStorage.clear()
        window.location = '/'

    }

    componentDidMount() {


        if(localStorage.token){
            this.setState({user:decode(localStorage.token).email})
        }

    }

    isAuth() {
        if (this.state.user) {
            return (
                <div>
                    <Link to="/items">My Items</Link>
                    <Link to="/" onClick={this.doLogout}>Log Out</Link>
                    <Link to="/items">{this.state.user}</Link>
                </div>
            )
        } else {
            return (
                <div>
                <Link to="/">Log In</Link>
                <Link to="/register">Sign Up</Link>
                </div>
            )
        }

    }




    render() {
        return (
            <div>
                <div className="header_container">
                    <h1 className="heading1">LYNX Seller</h1>
                    <br/><br/><br/><br/>
                </div>
                <div className="navbar1">
                    {this.isAuth()}
                </div>
            </div>
        )
    }

}

export default NavBar;