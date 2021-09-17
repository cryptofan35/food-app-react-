import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider, useSelector} from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import {createFirestoreInstance} from 'redux-firestore'
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
// import throttle from 'lodash/throttle'



// save redux store to local storage
// function saveToLocalStorage(state) {
//   try{
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch(e){
//     console.log(e)
//   }
// }

// function to load storage to redux state
// function loadFromLocalStorage() {
//   try {
//     const serializedState = localStorage.getItem('state')
//     if(serializedState === null) return undefined
//     return JSON.parse(serializedState)
//   }catch(e){
//     console.log(e)
//     return undefined
//   }
// }



const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({getFirebase})),
  // other store enhancers if any
);

// const persistedState = loadFromLocalStorage()


const store = createStore(
  rootReducer,
  // persistedState,
   enhancer);

const rrfConfig = { 
  userProfile: 'users',
  useFirestoreForProfile: true
 } // react-redux-firebase config

const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return (
  <div className="container center" style={{marginTop: 200}}>
      <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </div>
  );
  return children
}

// store.subscribe(throttle(() => saveToLocalStorage(store.getState()),1000))


ReactDOM.render(
  <Provider store={store}>
     <ReactReduxFirebaseProvider {...rrfProps}>
     <AuthIsLoaded>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthIsLoaded>
  </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
