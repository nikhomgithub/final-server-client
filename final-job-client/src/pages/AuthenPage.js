import React from 'react'
import './AuthenPage.css';
import {Link} from 'react-router-dom';

export default function AuthenPage() {
    return (
        <div className="hero-background">
            <div className="hero">
                <div className="center-box">
                    <h1>Authen Page</h1>
                    <div>
                        <button className="primary-btn">
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button className="primary-btn">
                            <Link to="/login">
                                Log In
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        
        </div>
       
    )
}
