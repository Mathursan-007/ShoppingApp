import React from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

class NavBar extends React.Component{


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
                    <Link to="/">Home</Link>
                    <Link to="/items">Products</Link>
                    <Link to="/cart"><i className="w3-xxlarge fa fa-shopping-cart"></i></Link>
                    <Link to="/" onClick={this.doLogout}>Log Out</Link>
                    <Link to="/items">{this.state.user}</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Sign Up</Link>
                </div>
            )
        }

    }



    render() {
        return (
            <div>
                <div className="header_container">
                    <h1 className="heading1">LYNX Shopping</h1>
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