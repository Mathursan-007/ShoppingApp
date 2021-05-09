import React from 'react'
import '../styles/listitem.css'
import Item from '../components/Item';
import axios from 'axios';
import {Link} from "react-router-dom";

class ListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items:[]
        }
    }

    componentDidMount() {
         axios.get('http://localhost:5000/seller/items/',{
                 headers:{
                     Authorization:localStorage.getItem("token")
                 }
              })
        .then(response => {
          this.setState({ items: response.data });
            console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    deleteItem=(id)=>{

        console.log(id)

        axios.delete("http://localhost:5000/seller/"+id)
            .then(res=>{
                this.setState({
                    items: this.state.items.filter(function(item) {
                        return item._id !== id;
                    })
                });
               console.log(res)
            }).catch(err=>{
               console.log(err);
        })

   }


    render() {



        if(localStorage.token){

            return (
                <div>
                    <div className="container">
                        <h2>My Items List</h2>
                        <hr className="hrStyles"/>
                        <br/>

                        <form className="search_form" action="#" method="post">

                            <div className="search_align">
                                <input type="text" name="id" placeholder="Search for Items"/>
                                <a href="#" className="search_icon"><i className="w3-xxlarge fa fa-search"></i></a>
                            </div>

                        </form>
                        <br/><br/>
                    </div>
                    <Link to="/add"><button className="btn_edit">Add</button></Link>
                    <div className="container">

                        <table border="1">
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>

                            {this.state.items.map((item,index) =>

                                <Item item={item} key={index} count={index+1} delete={this.deleteItem}/>

                            )}


                        </table><br/>
                    </div>
                </div>
            );

        }else{
            //alert('not loged in')
            window.location="/"
        }


    }

}



export default ListItem;