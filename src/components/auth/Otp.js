import React, { Component } from 'react';
import {connect} from 'react-redux';
import {validateOtp} from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';


class Otp extends Component {
    state = { 
        phone: '',
        submitDisabled: true
     }
     handleSubmit = (e) => {  
        e.preventDefault();
        console.log(this.state)
        this.props.validateOtp(this.state)
      };
      handleChange = (e) => {
        let otpValid = e.target.value ? true : false;  
        this.setState({
          [e.target.id]: e.target.value,
          submitDisabled: !otpValid
        });
      };
    render() { 
        const {auth, loading} = this.props
        if(auth.uid){
            return <Redirect to="/home" />
        }

        return ( 
            <div className="container">
            <h5 className="center otp-page">Verify your phone</h5>
            <div className="valign-wrapper row">
                <div className="col card hoverable s12 m8 pull-m2 l6 pull-l3 form-box">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-content">
                            <span className="card-title">Enter the 6-digit verification code sent to you via SMS below to verify your phone number</span>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="phone">Enter OTP</label>
                                    <input
                                    type="tel"
                                    className="validate"
                                    name="phone"
                                    id="phone"
                                    onChange={this.handleChange}
                                />
                                 </div>
                            </div>
                        </div>
                     <div className="card-action center">
                          <button className="btn z-depth-0" disabled={this.state.submitDisabled}>
                          {loading && (
                                <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px", fontSize: "15px" }}
                                />
                            )}
                            {loading && <span>Verify Mobile</span>}
                            {!loading && <span>Verify Mobile</span>} 
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        auth:  state.firebase.auth,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        validateOtp: (creds) => dispatch(validateOtp(creds))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Otp);