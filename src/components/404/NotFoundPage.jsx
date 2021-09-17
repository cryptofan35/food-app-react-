import React from 'react'
import {Link} from 'react-router-dom'


export default function NotFoundPage(){
    return(
        <>
        <div className="container load">
            <div className="row">
                <div className="col s12 l6">
                     <img src="img/404.svg" alt="404" className="responsive-img" />
                </div>
                <div className="col s12 l6">
                    <h4 className="center">We sincerely apologize.</h4>
                    <p className="center">The page you are looking for is no longer here. Maybe it was never here in the first place.</p>
                    <div className="center">
                    <Link to="/home" className="btn z-depth-0 blue darken-3"><i className="material-icons left">arrow_back</i>Go Home</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}