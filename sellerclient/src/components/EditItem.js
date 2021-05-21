import React from 'react';
import axios from "axios";


class EditItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
                _id:'',
                name: '',
                description:'',
                price: '',
                category: '',
                qty:'',
                details:''
        }
    }



    handleInput=(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }

    componentDidMount() {

        let item =this.props.location.state.item;

        this.setState({
                        _id:item._id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        qty: item.qty,
                        details:item
                    });


        // axios.get('http://localhost:5000/seller/'+id)
        //     .then(response => {
        //         this.setState({
        //             _id:response.data._id,
        //             name: response.data.name,
        //             description: response.data.description,
        //             price: response.data.price,
        //             category: response.data.category,
        //             qty: response.data.qty,
        //             details:response.data
        //         });
        //
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    handleSubmit = ev => {

        ev.preventDefault();

        let update ={

            _id:this.state._id,
            name:this.state.name,
            description:this.state.description,
            price:this.state.price,
            category:this.state.category,
            qty:this.state.qty,
        }

        const formData ={};

        for (let key in this.state.details) {
            if (this.state.details.hasOwnProperty(key)) {
                if(update[key]!==this.state.details[key]){
                    formData[key]=update[key]
                }
            }
        }



        axios.patch('http://localhost:5000/seller/'+this.state._id, formData)
            .then(response => {
                console.log(response);

                window.location="items"

            })
            .catch(err => {
                console.log(err);
            });

    }




    render() {

        return (

            <div className="container">

                <h2>Edit Item</h2>
                <hr className="hrStyles"/>
                    <br/>

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
                    </select>
                </label> <br/><br/>

                <label>Quantity:</label>
                <input type="number" placeholder="Enter Quantity" name={"qty"} value={this.state.qty} onChange={this.handleInput} min="0"  required/> <br/><br/>

                <input onClick={this.handleSubmit} type="submit" value="Update" />
                <input type="reset" value="Reset Form" id="reset"/>

            </form>

            </div>

        );

    }

}



export default EditItem;