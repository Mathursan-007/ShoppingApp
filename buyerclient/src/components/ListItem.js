import React, { Component } from 'react';
import '../styles/item.css';
import Item from "../components/Item";

class ListItem extends React.Component {

    render() {
        return (

                <div class="grid">

                    {this.props.items.map(item =>
                        <Item item = {item} addItem={this.props.addItem} items={this.props.items} />
                    )}
                </div>

        );
    }
}

export default ListItem;