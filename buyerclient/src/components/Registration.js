import React from "react";
import '../styles/registration.css'
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom'
import axios from 'axios'
class Registration extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit=(event)=> {
        event.preventDefault();
        if(this.state.password!=this.state.confirmPassword){
            alert('Password not matching')
        }else {
            const buyer={
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                phone:this.state.phone,
                address: this.state.address,
                password: this.state.password
            }
            axios.post('http://localhost:5000/buyer/',buyer)
                .then(res => {
                    this.setState({
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: '',
                        address: '',
                        password: '',
                        confirmPassword: ''
                    })
                    localStorage.setItem("token",res.data);
                    window.location = "/"
                })
                .catch(e=>{
                    console.log(e);
                })
        }


    }




    render() {
        return (

            <div className="container">
                <div className="title"> Sign Up</div>
                <div className="content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">First Name</span>
                                <input type="text" placeholder="Enter your first name" name={"firstname"} value={this.state.firstname} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Last Name</span>
                                <input type="text" placeholder="Enter your last username" name={"lastname"} value={this.state.lastname} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" placeholder="Enter your email" name={"email"} value={this.state.email} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" name={"phone"} value={this.state.phone} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" placeholder="Enter your address" name={"address"} value={this.state.address} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" placeholder="Enter your password" name={"password"} value={this.state.password} onChange={this.handleInput} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input type="password" placeholder="Confirm your password" name={"confirmPassword"} value={this.state.confirmPassword} onChange={this.handleInput} required/>
                            </div>
                        </div>

                        <div className="button">
                            <input type="submit" value="Create Account"/>
                        </div>
                    </form>
                </div>
            </div>

    );
    }
}

export default Registration;