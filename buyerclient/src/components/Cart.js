import React from 'react'
import '../styles/cart.css'
import CartItem from './CartItem'
import {Link} from "react-router-dom";

class Cart extends React.Component {

    state = {
        cart: this.props.cart,
        total: 0
    }

    componentDidMount() {

        let val=this.state.total;

        for(let i=0;i<this.state.cart.length;i++) {

            val=val+this.state.cart[i].price;

        }
        this.setState({total: val});
    }

    incrementTotal = value => {
        this.setState({total: this.state.total + value});
    }

    decrementTotal = value => {
        this.setState({total: this.state.total - value});
    }

    render() {
        return (
            <div class="container-fluid mt-5">
                <h2 class="mb-5 text-center">Shopping Cart</h2>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table id="myTable" class="table">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th class="text-right">
                                        <span id="amount" class="amount">Amount</span>
                                    </th>
                                    <th></th>
                                </tr>
                                </thead>


                                <tbody>
                                {this.props.cart.map(item =>

                                    <CartItem
                                        updateQty={this.props.updateQuantity}
                                        removeItem={this.props.removeItem}
                                        item={item}
                                        incrementTotal= {this.incrementTotal}
                                        decrementTotal={this.decrementTotal}
                                    />

                                )}
                                </tbody>


                                <tfoot>
                                <tr>
                                    <td colspan="5"></td>
                                    <td>
                                        <strong>TOTAL = $ {this.state.total}
                                        </strong>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                            <Link to={{pathname:"/checkout",state:{total:this.state.total,cart:this.state.cart}}}><button class="Checkout">Check out</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}



export default Cart;