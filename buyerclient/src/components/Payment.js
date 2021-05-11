import React from 'react';
import '../styles/cardpayment.css';
import axios from 'axios'


class Payment extends React.Component {

    state = {
        payMethod:'',
        phoneNo:'',
        pin:'',
        cardHolder:'',
        cardNo:'',
        cvcCode:'',
        city:0,
        deliveryAddress:'',
        total:'',
        qty:'',
        items:[]
    }

    componentDidMount() {

         this.setState({items:this.props.location.state.cart})
         this.setState({total: this.props.location.state.total});

    }

    handleInput = event => {

        this.setState({[event.target.name]:event.target.value});

    }

    handleSubmit = e => {

        e.preventDefault();


        let orders=[];
        for(let i in this.state.items){
            let obj=this.state.items[i]
            let order={ };
            for(let key in obj){
                if(key=="_id"||key=="availableqty") {
                    order[key] = obj[key]
                }
            }

            orders=[...orders,order];
        }

        const item = {

            deliveryAddress:this.state.deliveryAddress,
            orders:orders

        }


        if(this.state.payMethod=="Card"){

            const card={

                cardHolder:this.state.cardHolder,
                cardNo:this.state.cardNo,
                cvcCode:this.state.cvcCode,
                total:this.state.total

            }


            axios.post('http://localhost:5000/buyer/cardpay',card,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
                .then(res => {
                    if(res.data){
                        axios.post("http://localhost:5000/buyer/deliver",item,{
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                            .then(res=>{
                                if(res.data) {
                                    alert('Your payment was made successfully...Check your mail for confirmation');
                                    window.location="/items"
                                } else {
                                    alert("Invalid shipping details")
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }else{
                        alert("Invalid card details..Please re-enter!");
                    }
                })
                .catch(err => {
                    console.log(err);
                });



        }else if(this.state.payMethod=="Mobile"){

            const phone ={

                phoneNo:this.state.phoneNo,
                pin:this.state.pin,
                total:this.state.total,

            }

            axios.post('http://localhost:5000/buyer/mobilepay',phone,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
                .then(res => {
                    if(res.data){
                        axios.post("http://localhost:5000/buyer/deliver",item,{
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                            .then(res=>{
                                if(res.data) {
                                    alert('Your payment was made successfully...Check your mail for confirmation');
                                    window.location="/items"
                                } else {
                                    alert("Invalid shipping details")
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }else{
                        alert("Invalid mobile details..Please re-enter!");
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        }


    }


    checkMethod=()=>{

        if(this.state.payMethod=="Card"){
            return(
                <div>
                    <h2>Card details</h2><br/>

                    <label>Enter Card Holder's Name</label><br/>
                    <input type="text" name="name" placeholder="Enter Card Holder's Name" name={"cardHolder"} onChange={this.handleInput} required/><br/><br/>

                    <label>Enter Card Number</label><br/>
                    <input type="number" name="number" placeholder="Enter Card Number" name={"cardNo"} onChange={this.handleInput} required/><br/><br/>

                    <label>Enter CVC Code</label><br/>
                    <input type="number" name="cvc" placeholder="Enter CVC Code" name={"cvcCode"} onChange={this.handleInput} required/><br/><br/><br/>
                </div>
             )

        }else if(this.state.payMethod=="Mobile"){

            return (
                <div>
                    <h2>Payment Using Mobile Phone</h2>

                        <label>Enter Phone Number</label><br/><br/>
                        <input type="number" name="phoneNo" placeholder="Enter Mobile Phone Number" onChange={this.handleInput} required/><br/><br/><br/>

                        <label>Enter PIN</label><br/><br/>
                        <input type="number" name="pin" placeholder="Enter the 4-digit pin"  onChange={this.handleInput} required/><br/><br/><br/>

                </div>
            )
        }

    }


    render() {

        return (

            <div>
                <div className="container">

                    <h2>Checkout</h2>
                    <hr className="hrStyles"/>
                    <br/>

                    <label>
                        Select your Payment method : </label>
                    <select onChange={this.handleInput} name={"payMethod"} required>
                        <option>Select</option>
                        <option value="Card">Card</option>
                        <option value="Mobile">Mobile</option>
                    </select>


                    <form onSubmit={this.handleSubmit}>

                        {this.checkMethod()}

                        <h2>Shipping details</h2>

                        <label>Address</label><br/>
                        <input type="text" name="delivery" placeholder="Enter the shipping address" name={"deliveryAddress"} onChange={this.handleInput} required/><br/><br/>

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

                        <label>Item Amount</label><br/>
                        {this.props.location.state ? <input type="number" name="total"  value={this.props.location.state.total} onChange={this.handleInput} required/> : ""}
                        <br/><br/>

                        <label>Shipping Amount</label><br/>
                        <input type="number" name="city" value={this.state.city} onChange={this.handleInput} required/><br/><br/>

                        <label>Total Amount</label><br/>
                        <input type="number" name="total" value={(this.state.total+Number(this.state.city))} onChange={this.handleInput} required/><br/><br/>

                        <input type="submit" value="Confirm CardPayment" id="submit"/>
                        <input type="reset" value="Reset Form" id="reset"/>

                    </form>
                </div>
            </div>


        );

    }

}



export default Payment;