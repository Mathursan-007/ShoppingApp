import NavBar from "./components/NavBar";
import React, {useState,useEffect} from "react";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Link,Switch,Route,Redirect} from 'react-router-dom'
import Login from "./components/Login";
import Registration from "./components/Registration";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import ListItem from "./components/ListItem";


function App() {



  return (
      <div>
          <Router>
              <NavBar/>
              <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route path="/items" component={ListItem}/>
                  <Route path="/add" component={AddItem}/>
                  <Route path="/register" component={Registration}/>
                  <Route path="/edit" component={EditItem}/>
              </Switch>
              <Footer/>
          </Router>
      </div>
  );
}

export default App;
