import React from "react";
import '../styles/item.css'

class Item extends React.Component {

    render() {
        return (

            <React.Fragment>
                <div className="grid-item">
                    <div className="card1">
                        <div className={"card1-img"} ><img className={"card1-img"} alt="Rome" src={require(`../images/${this.props.item.photo}`).default}/></div>
                        <div className="card1-content">
                            <div>
                                <div>
                                    <h1 className="card1-header">{this.props.item.name}</h1>
                                    <p className="card1-text"><b>Price:</b>{this.props.item.price} </p>
                                    <p className="card1-text"><b>Description:</b>{this.props.item.description} </p>
                                    <p className="card1-text"><b>Contact:</b>{this.props.item.seller} </p>
                                    <p className="card1-text"><b>Available:</b>{this.props.item.qty} </p>
                                </div>
                            </div>

                            {this.props.item.qty > 0 ?
                            <button
                                className="card1-btn"
                                onClick={() => this.props.addItem(this.props.item)}
                            >Add-Cart <span>&rarr;</span></button>
                            :
                                <button className="card2-btn" onClick={() => this.props.addItem(this.props.item)} disabled={true}>Out-of-Stock</button>  }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Item;