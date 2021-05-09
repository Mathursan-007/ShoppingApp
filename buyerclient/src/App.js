import './App.css';
import Index from './components/Index';
import NavBar from "./components/NavBar";
import React from "react";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom'
import Login from "./components/Login";
import Registration from "./components/Registration";
import axios from 'axios';
import ListItem from "./components/ListItem";
import CardPayment from "./components/CardPayment";

class App extends React.Component {

    state = {
        items: [],
        cart: []
    }
    componentDidMount() {
        axios.get('http://localhost:5000/buyer/items/')
        .then(response => {
            this.setState({ items: response.data });
            console.log(response.data);
            })
        .catch((error) => {
            console.log(error);
      })
    }

    addItem = item => {
        this.setState({cart: [...this.state.cart,item]});
    }

    removeItem = item => {
        this.setState({
            cart: this.state.cart.filter(function(cartItem) {
                return item !== cartItem;
            })
        });

    }

    render()

    {
        return (
            <div>
                <Router>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/">
                            <Index/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/items" >
                            <ListItem items = {this.state.items} addItem={this.addItem} />
                        </Route>
                        <Route path="/cart">
                            <Cart removeItem={this.removeItem} cart = {this.state.cart} />
                        </Route>
                        <Route path="/register">
                            <Registration/>
                        </Route>
                        <Route path="/checkout" component={CardPayment}/>
                    </Switch>
                    <Footer/>
                </Router>

            </div>

        );
    }
}

export default App;