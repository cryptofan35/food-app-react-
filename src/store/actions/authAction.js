export const signIn = (credentials, appVerifier) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "SIGNIN_LOADER" });
    //make async call to firebase
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithPhoneNumber(credentials.phone, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        dispatch({ type: "OTP_SUCCESS", confirmationResult });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "OTP_ERROR", err });
      });
  };
};

export const validateOtp = (otp) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "SIGNIN_LOADER" });

    var confirmationResult = getState().auth.otpid;
    console.log(confirmationResult);
    const phone = otp.phone;

    confirmationResult
      .confirm(phone)
      .then(function (result) {
        console.log(result);
        // User signed in successfully.
        var user = result.user;
        dispatch({ type: "VALID_OTP" }, user);
        // ...
      })
      .catch(function (error) {
        dispatch({ type: "INVALID_OTP" }, error);
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const errorRemove = () => {
  return (dispatch, getState) => {
    dispatch({ type: "ERROR_REMOVE" });
  };
};
