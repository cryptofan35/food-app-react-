import React from 'react';
import {Link} from 'react-router-dom';


const Failed = () =>{
    return(
        <div className="container load">
            <div className="row">
                <div className="col s12 l6 push-l6 center">
                <img src="img/error.svg" width="300" height="300" alt="cancel" />
                </div>
                <div className="col s12 l6 pull-l6" style={{marginTop: 30}}>
                <h6 className="center">Food app</h6>
                    <h5 style={{marginTop: 30}} className="center">Your payment was canceled</h5>
                    <div className="center">
                    <Link to="/summary" className="btn z-depth-0 blue darken-3" style={{marginTop: 20}}><i className="material-icons left">arrow_back</i>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Failed