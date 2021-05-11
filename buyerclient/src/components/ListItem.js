import React, { Component } from 'react';
import '../styles/item.css';
import Item from "../components/Item";

class ListItem extends React.Component {


    state={
        category:"all"
    }

    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    display=()=>{

        if(this.state.category=="all"){
            return(
                this.props.items.map(item =>
                        <Item item = {item} addItem={this.props.addItem} items={this.props.items} />
                )
            )
        }else{
            return (
                this.props.items.map(item =>
                    item.category==this.state.category ?
                        <Item item = {item} addItem={this.props.addItem} items={this.props.items} />:" "
                )
            )
        }

    }

    render() {

        return (


           <div>
               <div style={{textAlign:"center",margin:"auto",marginTop:"20px",marginBottom:"200px"}}>
                   <select name={"category"} style={{width:"300px"}} onChange={this.handleInput} >
                       <option value={"all"} selected>All</option>
                       <option value="electronics">Electronics</option>
                       <option value="clothing">Clothing</option>
                       <option value="jewelry">Jewelry</option>
                       <option value="beauty">Beauty</option>
                       <option value="furniture">Furniture</option>
                       <option value="books">Books</option>
                       <option value="other">Other</option>
                   </select>
               </div>
                <div class="grid">

                    {this.display()}

                </div>
           </div>
        );
    }
}

export default ListItem;