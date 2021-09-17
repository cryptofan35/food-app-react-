import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import {connect} from 'react-redux'


class About extends Component {
    state = { 

     }
    
     
    render() { 
        const {shop} = this.props
    
        return ( 
            <React.Fragment>
                 <Navbar />
                <div className="container">
                    <h5>Store Information</h5>
                    <div className="row">
                        <div className="col s12 l12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title" style={{fontWeight: 700}}>{shop.brandName}</span>
                                    <p>{shop.commercialAddress}</p>
                                    <span className="card-title" style={{fontWeight: 700, marginTop: 20}}>Additional Information</span>
                                    <p>Phone: {shop.commercialPhone}</p>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        shop: state.shop.shopDetails
    }
}

 
export default connect(mapStateToProps)(About);