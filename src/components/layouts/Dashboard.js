import React, { Component } from 'react';
import Navbar from './Navbar'
import Slider from './Slider'
// import Select from './DeliveryOptions'
import SubCategory from './SubCategory'
import Footer from './Footer';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import {shopDetails} from '../../store/actions/shopAction'




class Dashboard extends Component {
    state = { 

     }
     componentDidMount(){
        this.props.shop()
     }
    
    render() { 
        // const {auth} = this.props
        // if(!auth.uid) return <Redirect to="/" />
     
        return ( 
            <div>
                <Navbar/>
                <Slider/>
                {/* <Select /> */}
                <SubCategory />
                <Footer />
            </div>
         );
    }
}

const mapStateToprops = (state) =>{
    return{
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        shop: () => dispatch(shopDetails())
    }
}

 
export default connect(mapStateToprops, mapDispatchToProps)(Dashboard);