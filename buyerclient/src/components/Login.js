import React from 'react'
import '../styles/login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit=(event)=> {

        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/seller/login',user)
            .then(res =>{

                    localStorage.setItem("token",res.data);

                    this.setState({
                        email: '',
                        password: ''
                    })

                    window.location="/"
                }

            )
    }


        render() {
            return (

                <div className="wrapper">
                    <div className="title">Sign In</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <input type="text" name={"email"} value={this.state.email} onChange={this.handleInput} required/>
                            <label>Email Address</label>
                        </div>
                        <div className="field">
                            <input type="password" name={"password"} value={this.state.password} onChange={this.handleInput} required/>
                            <label>Password</label>
                        </div>
                        <div className="content">
                            <div className="checkbox">
                                <input type="checkbox" id="remember-me"/>
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <div className="pass-link">
                                <a href="#">Forgot password?</a></div>
                        </div>
                        <div className="field">
                            <input type="submit" value="Login"/>
                        </div>
                        <div className="signup-link">
                            Not a member? <Link to="/register">Signup now</Link></div>
                    </form>
                </div>

            );
    }
}

export default Login;