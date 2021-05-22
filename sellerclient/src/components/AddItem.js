import React from "react";
import '../styles/additem.css';
import axios from 'axios'

class AddItem extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            description:'',
            price: '',
            category: '',
            qty:'',
            photo: ''
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handlePhoto = event => {
        this.setState({photo:event.target.files[0]});

    }


    handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name",this.state.name);
        formData.append("description",this.state.description);
        formData.append("price",this.state.price);
        formData.append("category",this.state.category);
        formData.append("photo",this.state.photo);
        formData.append("qty",this.state.qty)


        axios.post('http://localhost:5000/seller/add', formData,{
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    name: '',
                    description:'',
                    price: '',
                    category: '',
                    qty:'',
                    photo: ''
                })
            })
            .catch(err => {
                console.log(err);
            });

    }





    render() {

        return (

            <div className="container">

                <h2>Add Item</h2>
                <hr className="hrStyles"/>

                <form onSubmit={this.handleSubmit}>
                    <label>Item Name</label>
                    <input type="text" placeholder="Enter Item Name" value={this.state.name} onChange={this.handleInput} name={"name"} required /> <br/><br/>

                    <label>Description:</label>
                    <textarea value={this.state.description} onChange={this.handleInput} name={"description"} /> <br/><br/>

                    <label>Price</label>
                    <input type="number" placeholder="Enter Price" name={"price"} value={this.state.price} onChange={this.handleInput} min="0"  required/> <br/><br/>

                    <label>
                        Item Category :
                        <select value={this.state.category} onChange={this.handleInput} name={"category"}>
                            <option selected>Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="beauty">Beauty</option>
                            <option value="furniture">Furniture</option>
                            <option value="books">Books</option>
                            <option value="other">Other</option>
                        </select>
                    </label> <br/><br/>

                    <label>Quantity:</label>
                    <input type="number" placeholder="Enter Quantity" name={"qty"} value={this.state.qty} onChange={this.handleInput} min="0"  required/> <br/><br/>

                    <label>Choose image</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={this.handlePhoto}
                        required
                    />


                    <input type="submit" value="Add Item" />
                    <input type="reset" value="Reset Form" id="reset"/>


                </form>
            </div>

        );

    }

}



export default AddItem;