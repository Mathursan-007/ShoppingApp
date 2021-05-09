import React from 'react';
import s1 from '../images/s1.png'
import s2 from '../images/s2.jpg'
import s4 from '../images/s4.jpg'
import '../styles/slideshow.css'

class Slideshow extends React.Component {

    state = { slideIndex:1}


    plusSlides(n) {
        this.setState({slideIndex:this.state.slideIndex+n})
        this.showSlides(this.state.slideIndex);
    }
    currentSlide(n) {
        this.showSlides(this.state.slideIndex=n);
    }

    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.state.slideIndex = 1}
        console.log(slides.length)
        if (n < 1) {this.state.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.state.slideIndex-1].style.display = "block";
        dots[this.state.slideIndex-1].className += " active";
    }

    componentDidMount() {

        this.showSlides(this.state.slideIndex)
    }


    render() {

        return (
            <div>
            <div className="slideshow-container">

                <div className="mySlides fade">
                    <img src={s1} style={{width:"100%",height:"500px"}}/>
                </div>

                <div className="mySlides fade">
                    <img src={s2} style={{width:"100%",height:"500px"}}/>
                </div>

                <div className="mySlides fade">
                    <img src={s4} style={{width:"100%",height:"500px"}}/>
                </div>


                <a className="prev" onClick={this.plusSlides.bind(this,-1)}>&#10094;</a>
                <a className="next" onClick={this.plusSlides.bind(this,1)}>&#10095;</a>

            </div>
        <br/>

            <div style={{textAlign:"center"}}>
                <span className="dot" onClick={this.currentSlide.bind(this,1)}></span>
                <span className="dot" onClick={this.currentSlide.bind(this,2)}></span>
                <span className="dot" onClick={this.currentSlide.bind(this,3)}></span>
            </div>
           </div>

        );

    }

}



export default Slideshow;