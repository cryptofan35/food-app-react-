import authReducer from './authReducer';
import itemReducer from './itemReducer';
import shopReducer from './shopReducer';
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import  {firebaseReducer} from 'react-redux-firebase'



const rootReducer = combineReducers({
    auth: authReducer,
    item: itemReducer,
    shop: shopReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;