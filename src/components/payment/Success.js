import React, {Component} from 'react';
import {connect} from 'react-redux'
import {takeOrder} from '../../store/actions/itemAction'
import {Redirect} from 'react-router-dom';
import M from 'materialize-css';



class Success extends Component {
    state = { 

     }

    handleOrder = () =>{
        this.props.takeOrder()
        M.toast({html: "Your order is been placed.", classes: 'green'})
    }

    render() { 
        const {order_msg,loading} = this.props

        if(order_msg === '成功[OK]') return <Redirect to="/summary" />
         

        return ( 
            <div className="container load">
            <div className="row">
                <div className="col s12 l6 push-l6 center">
                    <img src="img/confirm.svg" className="responsive-img" alt="confirm" />
                </div>
                <div className="col s12 l6 pull-l6" style={{marginTop: 30}}>
                     <h6 className="center">Food app</h6>
                    <h5 style={{marginTop: 30}} className="center">Your payment succeeded</h5>
                    <p className="center">Click the "Place Order" button to place your order.</p>
                    <div className="center">
                    <button onClick={this.handleOrder} className="btn z-depth-0 blue darken-3" style={{marginTop: 20, textTransform: 'initial'}}>
                    {loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px", fontSize: "15px" }}
                        />
                    )}
                    {loading && <span>Place Order</span>}
                    {!loading && <span>Place Order</span>} 
                    </button>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}


const mapStateToProps = (state) =>{
    return{
        order_msg: state.item.order_msg,
        loading: state.item.loading,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        takeOrder: () => dispatch(takeOrder()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);