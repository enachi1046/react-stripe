import React, {Component} from 'react'
import settings from '../../settings';

const RegisterSuccess = () =>
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
                        <h1 className="grey move-center">Thank you for signing up</h1>
                        <p className="grey move-center bottom-pad">Verify your email to begin searching for scholarships </p>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            fetching: false,
            error: undefined,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    doRegister() {
        const {firstName, lastName, email, password, confirmPassword} = this.state;
        this.setState({fetching: true, error: undefined});

        if ( password == confirmPassword){
        return fetch(settings.urls.register, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, email, password})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, error: undefined, registered: true});
            })
            .catch(error=>this.setState({fetching: false, error: error.message}));
        }
        else {
            this.setState({error: 'Passwords do not match', fetching: false});
        }
    }
    

    render() {
        const {registered, error, fetching, firstName, lastName, email, password, confirmPassword} = this.state;
        if (registered)
            return <RegisterSuccess/>;

        return (
            <div className="container-fluid register-wrapper-background">
            
                <div className="row row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 register-padding">
                        <div className="register-inner-box">
                        <h3 className="register-header">Register An Account</h3>
                            <input type="text" placeholder="First Name" className="register-input"
                                value={firstName} onChange={e=>this.setState({firstName: e.target.value})}/>
                            <input type="text" placeholder="Last Name" className="register-input"
                                value={lastName} onChange={e=>this.setState({lastName: e.target.value})}/>
                            {/*<input type="text" placeholder="Username" className="register-input"/>*/}
                            <input type="email" placeholder="Email" className="register-input"
                                   value={email} onChange={e=>this.setState({email: e.target.value})}/>
                            <input type="password" placeholder="Password" className="register-input"
                                   value={password} onChange={e=>this.setState({password: e.target.value})}/>
                            <input type="password" placeholder="Confirm Password" className="register-input"
                                   value={confirmPassword} onChange={e=>this.setState({confirmPassword: e.target.value})}/>
                            {error && <div className="register-validation-error">{error}</div>}
                            {fetching?
                                <div className="register-button"><img className="register-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="register-button" value="Register" onClick={()=>this.doRegister()}/>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }
}