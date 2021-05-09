import React from 'react';
import '../styles/cardpayment.css'



class CardPayment extends React.Component {

    state = {
        cardHolder:'',
        cardNo:'',
        cvcCode:'',
        deliveryPrice:'',
        city:0,
        deliveryAddress:'',
        total:''
    }

    componentDidMount() {
        this.setState({total: this.props.location.state.total});
    }

    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log(this.state.photo);

        const item = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            shippingMethod: this.state.shippingMethod,
            shippingPrice: this.state.shippingPrice,
            qty: this.state.qty,
            photo: this.state.photo
        }


        /* axios.post('http://localhost:5000/', item)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            }); */

    }




    render() {

        return (

            <div>
                <div className="container">

                    <h2>Checkout</h2>
                    <hr className="hrStyles"/>
                    <br/>

                    <form action="#" method="post">

                        <h2>Card details</h2>

                        <label>Enter Card Holder's Name</label><br/><br/>
                        <input type="text" name="name" placeholder="Enter Card Holder's Name" required/><br/><br/><br/>

                        <label>Enter Card Number</label><br/><br/>
                        <input type="number" name="number" placeholder="Enter Card Number" required/><br/><br/><br/>

                        <label>Enter CVC Code</label><br/><br/>
                        <input type="number" name="cvc" placeholder="Enter CVC Code" required/><br/><br/><br/>

                        <label>Address</label><br/><br/>
                        <input type="number" name="delivery" placeholder="Enter CVC Code" required/><br/><br/><br/>

                        <h2>Shipping details</h2>
                        <label>
                            Select your City : </label>
                        <select value={this.state.city} onChange={this.handleInput} name={"city"} required>
                            <option selected>Select</option>
                            <option value={200}>Colombo</option>
                            <option value={400}>Kandy</option>
                            <option value={500}>Galle</option>
                            <option value={300}>Gampaha</option>
                        </select>
                        <br/><br/>

                        <label>Item Amount</label><br/><br/>
                        {this.props.location.state ? <input type="number" name="amount" value={this.props.location.state.total} required/> : ""}
                        <br/><br/>

                        <label>Shipping Amount</label><br/><br/>
                        <input type="number" name="shippingPrice" value={this.state.city} required/><br/><br/>

                        <label>Total Amount</label><br/><br/>
                        <input type="number" name="shippingPrice" value={(this.state.total+Number(this.state.city))} required/><br/><br/>

                        <input type="submit" value="Confirm CardPayment" id="submit"/>
                        <input type="reset" value="Reset Form" id="reset"/>

                    </form>

                </div>
            </div>


        );

    }

}



export default CardPayment;