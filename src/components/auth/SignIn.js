import React, { Component, createRef } from "react";
import {connect} from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { errorRemove } from '../../store/actions/authAction';
import {shopDetails} from '../../store/actions/shopAction'
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';


class SignIn extends Component {
  constructor(props){
    super(props)
    this.state =  {
      phone: "",
      submitDisabled: true
    }
    this.recaptchaRef = createRef()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    this.props.signIn(this.state, appVerifier)
  };
  handleChange = (e) => {
    let emailValid = e.target.value ? true : false;       
    this.setState({
      [e.target.id]: e.target.value,
      submitDisabled: !emailValid
    });
    this.props.errorRemove()
  };

  componentDidMount() {
    const{user} = this.props
    if(!user.uid){
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptchaRef.current, {
        'size': 'invisible',
        'callback': function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
     });
     window.recaptchaVerifier.render().then(function (widgetId) {
       window.recaptchaWidgetId = widgetId;
     });
    }
    this.props.shop()
  }
  render() {
    // console.log(this.recaptchaRef.current)
    const {auth, otpError, loading, user} = this.props
      if(auth.verificationId){
        return <Redirect to="/validate/otp" />
      }
      if(user.uid){
        return <Redirect to="/home" />
      }
    return (
        <div className="container">
            <h5 className="center signin-text">Enter your Phone Number to create account or login</h5>
            <div className="valign-wrapper row">
                <div className="col card hoverable s12 m8 pull-m2 l6 pull-l3 form-box">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-content">
                            <div className="row">
                                <div className="input-field col s12">
                                <i className="fa fa-phone prefix"></i>
                                    <input
                                    type="text"
                                    className="validate"
                                    id="phone"
                                    placeholder="+65 8123 4567"
                                    onChange={this.handleChange}
                                />
                                  <label htmlFor="phone">Phone Number</label>
                                  <span className="helper-text red-text">{otpError}</span>
                                 </div>
                                 <div className="center col s12 input-field">
                                    <div ref={this.recaptchaRef}></div>
                                    <button className="btn z-depth-0" disabled={this.state.submitDisabled}>
                                      {loading && (
                                        <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px", fontSize: "15px" }}
                                        />
                                    )}
                                    {loading && <span>Login</span>}
                                    {!loading && <span>Login</span>} 
                                  </button>      
                                 </div>
                            </div>
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
        auth: state.auth.otpid,
        otpError: state.auth.otpError,
        user: state.firebase.auth,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    signIn: (creds, appVerifier) => dispatch(signIn(creds,appVerifier)),
    errorRemove : () => dispatch(errorRemove()),
    shop: () => dispatch(shopDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
