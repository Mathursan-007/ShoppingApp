import React, { Component } from 'react';

class CartItem extends React.Component {

    state = {
        qty: 1
    }


    incrementQty = () => {
        if(this.state.qty!=this.props.item.qty) {
            this.setState({qty: this.state.qty+1});
            this.props.incrementTotal(this.props.item.price);
        }
    }

    decrementQty = () => {

        if(this.state.qty!=1) {
            this.setState({qty: this.state.qty-1});
            this.props.decrementTotal(this.props.item.price);
        }

    }

    resetValue = (item,itemPrice) => {

        this.props.removeItem(item);
        this.props.decrementTotal(itemPrice);

    }

    render() {
        return (
            <tr>
                <td>
                    <div class="product-img">
                        <div class="img-prdct" style={{backgroundImage:`url(${require('../images/'+this.props.item.photo).default})`}}>
                        </div>
                    </div>
                </td>
                <td>
                    <p>Product One</p>
                </td>
                <td>
                    <div class="button-container">
                        <button class="cart-qty-minus" type="button" onClick={this.decrementQty}>-</button>
                        <input type="number" value={this.state.qty} class="price form-control" disabled/>
                        <button class="cart-qty-plus" type="button" onClick={this.incrementQty}>+</button>
                    </div>
                </td>
                <td>
                    <input type="text" value={this.props.item.price} class="price form-control" disabled />
                </td>
                <td>Rs.<span id="amount" class="amount">{(this.state.qty*this.props.item.price)}</span>
                </td>
                <td><button className="button-dlt" onClick={() => this.resetValue(this.props.item,((this.state.qty*this.props.item.price)))}> X </button>
                </td>
            </tr>
        );
    }
}

export default CartItem;