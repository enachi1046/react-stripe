import React, {Component} from 'react'

import settings from '../../settings';

const SentSuccess = () =>
    <div className="container-fluid register-wrapper-background">
        <svg id="successAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
            <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id="successAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
        </svg>
        <div className="email-confirmed-wrapper">
            <div className="container-fluid">
                <div className="row paddings"></div>
                <div className="container-fluid">
                    <div className="row">
                        <h1 className="grey move-center">You've Got Mail!</h1>
                        <p className="grey move-center bottom-pad">Check your email inbox for a reset password link.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            fetching: false,
            error: undefined,
            email: '',
        };
    }

    doForgot() {
        const {email} = this.state;
        this.setState({fetching: true, error: undefined});

    
        return fetch(settings.urls.forgot, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, error: undefined, sent: true});
            })
            .catch(error=>this.setState({fetching: false, error: error.message}));
        }
        
    

    render() {
        const {sent, error, fetching, email} = this.state;
        if (sent)
            return <SentSuccess/>;

        return (
            <div className="container-fluid forgot-wrapper-background">
            
                <div className="row row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 forgot-padding">
                        <div className="forgot-inner-box">
                        <h3 className="forgot-header">Reset Your Password</h3>
                            
                            <input type="email" placeholder="Email" className="forgot-input"
                                   value={email} onChange={e=>this.setState({email: e.target.value})}/>
                            
                            {error && <div className="forgot-validation-error">{error}</div>}
                            {fetching?
                                <div className="forgot-button"><img className="forgot-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="forgot-button" value="Reset Password" onClick={()=>this.doForgot()}/>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }
}