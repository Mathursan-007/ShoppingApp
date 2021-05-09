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
                                </div>
                            </div>

                            <button
                                className="card1-btn"
                                onClick={() => this.props.addItem(this.props.item)}
                            >Add-Cart <span>&rarr;</span></button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Item;