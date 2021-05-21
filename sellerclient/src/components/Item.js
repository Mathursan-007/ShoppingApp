import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Item extends React.Component {

 

    render() {
        const { name , price ,_id} = this.props.item

        return (
            <tr>
                <td>{this.props.count}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td><Link to={{pathname:"edit",state:{item:this.props.item}}}><button className="btn_edit">Edit</button></Link></td>
                <td><input type="button" name="Delete" value="Delete" className="btn_delete" onClick={()=>this.props.delete(_id)}/></td>

            </tr>
        );
    }
}

export default Item;