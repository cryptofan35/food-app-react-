import React, { Component } from 'react';
import Navbar from '../layouts/Navbar'


class OrderHistory extends Component {
    state = {

      }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <div className="container">
                   <div className="card" style={{marginTop: 20}}>
                       <div className="card-content">
                            <span className="card-title center green-text text-darken-1">COMPLETED</span>
                            <p className="center">Your order is now completed. We hope you enjoyed it!</p>                           
                        </div>  
                        <div className="progresy">
                            <ul className="progresy-ul">
                                <li>
                                    <i className="fa fa-check white-text"></i>
                                    <p>SUBMITTED</p>
                                    <p>10:20</p>
                                </li>
                                <li>
                                    <i className="fa fa-check white-text"></i>
                                    <p>READY</p>
                                    <p>10:46</p>
                                </li>
                            </ul>
                        </div>
                        <div className="card-action center">
                        <button style={{textTransform: 'initial'}} className="btn white grey-text text-darken-1 z-depth-0"><i className="material-icons left">refresh</i>Update Order Information</button>
                        </div>
                   </div>

                   {/* order details */}
                   <div className="card">
                       <div className="card-content">
                           <span className="card-title" style={{fontWeight: 600}}>Li Ji Coffee House</span>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>PickUp #:</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>FO17</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Order Type:</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>Eat In</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Transaction time</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>04 Mar, 10:20</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Transaction Ref</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>AR7HX3A38R</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Payment Method</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>Stripe</p>
                               </div>
                           </div>
                       </div>
                       <div className="card-action">
                       <div className="row">
                        <div className="col s3 l3">
                            <img src="img/food1.jpg" width="200" height="30" alt="" className="responsive-img" />
                        </div>
                        <div className="col s6 l6">
                            <span className="card-title" style={{fontWeight: 600}}>Coffee</span>
                            <p>Less Sugar</p>
                            <p style={{fontWeight: 600}}>$1.30</p>
                        </div>
                        <div className="col s3 l3">
                            <p style={{fontWeight: 600}}>1x</p>
                        </div>
                        </div>
                       </div>
                   </div>

                </div>
            </React.Fragment> 
        );
    }
}
 
export default OrderHistory;