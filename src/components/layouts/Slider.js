import React, { Component } from 'react';
import M from 'materialize-css';

class Slider extends Component {
    state = { 

     }
     componentDidMount(){
        let slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 400
        });
     }
    render() { 
        return ( 
             <div className="slider">
                <ul className="slides">
                <li>
                    <img src="img/food1.jpg" className="responsive-img" alt="second" /> 
                </li>
            <li>
                <img src="img/food1.jpg" className="responsive-img" alt="third" />
             </li>
         <li>
            <img src="img/food3.jpg" className="responsive-img" alt="fourth" />
                </li>
            </ul>
        </div>
         );
    }
}
 
export default Slider;