const initState = {
    otpid: '',
    otpError: null,
    loading: false
}

const authReducer = (state = initState, action) =>{
    switch(action.type){
        case 'SIGNIN_LOADER':
            return{
                ...state,
                loading: true
            }
        case 'OTP_SUCCESS' :
            console.log("Otp has been sent")
            return {
                ...state,
                otpid: action.confirmationResult,
                otpError: null,
                loading: false
            }
        case 'OTP_ERROR' :
            return{
                ...state,
                otpError: 'Invalid mobile number',
                loading: false
            }
        case 'ERROR_REMOVE' :
            return{
                ...state,
                otpError: null
            }
        case 'VALID_OTP' :
            return{
                ...state,
            }
        case 'SIGNOUT_SUCCESS' :
            console.log('signout success')
            return state
        default:
            return state
    }
}


export default authReducer;