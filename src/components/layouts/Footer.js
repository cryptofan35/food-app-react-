import React, { Component } from 'react';
import {connect} from 'react-redux';


class Footer extends Component {
    state = {

      }
    render() { 
        return ( 
               <footer className="footer">
                    <div className="container" style={{paddingTop: 20}}>
                        <p className="footer-color">&copy; 2021 Food app. All rights reserved.</p>
                    </div>
               </footer>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        name: state.shop.shopDetails
    }
}
 
export default connect(mapStateToProps)(Footer);