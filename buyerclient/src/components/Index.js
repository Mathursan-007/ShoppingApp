import React from 'react';
import Slideshow from "./Slideshow";
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import { Link } from 'react-router-dom';
import '../styles/index.css'

class Index extends React.Component {

    state = { }



    render() {

        return (
            <div>
               <Slideshow/>
                <hr/>
                <div className="cc_row">
                    <div className="cc_column">
                        <div className="card">
                            <img src={img1} alt="Item 1" style={{width:'100%',height:"250px"}}/>
                                <h1>Tailored Jeans</h1>
                                <p className="price">$19.99</p>
                                <p>Some text about the jeans. Super slim and comfy.</p>
                                <p>
                                    <button>See Our Collections</button>
                                </p>
                        </div>
                    </div>

                    <div className="cc_column">

                        <div className="card">
                            <img src={img2}  alt="Item 1" style={{width:'100%',height:"250px"}}/>
                                <h1>Tailored Jeans</h1>
                                <p className="price">$19.99</p>
                                <p>Some text about the jeans. Super slim and comfy.</p>
                                <p>
                                    <button>See Our Collections</button>
                                </p>
                        </div>
                    </div>

                    <div className="cc_column">

                        <div className="card">
                            <img src={img3}  alt="Item 1" style={{width:'100%',height:"250px"}}/>
                                <h1>Tailored Jeans</h1>
                                <p className="price">$19.99</p>
                                <p>Some text about the jeans. Super slim and comfy.</p>
                                <p>
                                    <button>See Our Collections</button>
                                </p>
                        </div>

                    </div>
                </div>

                <hr/>
            </div>
        );

    }



}



export default Index;






