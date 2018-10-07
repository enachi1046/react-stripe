import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import settings from '../../settings';
import { parse } from 'query-string';

const ChangeSuccess = () =>
<div class="container-fluid register-wrapper-background">
	<svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
  <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
  <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
  <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
</svg>
		<div class="email-confirmed-wrapper">
					<div class="container-fluid">
						<div class="row paddings">
                         
            </div>
            <div class="container-fluid">
						<div class="row">

 							<h1 class="grey move-center">Your New Password has been saved successfully!</h1>
 							
 							<div class="col-md-4 col-sm-4"></div>
 							<div class="col-md-4 col-sm-4"><p class="bottom-pad"><Link to="/login"><div class="button"> Login </div></Link></p></div>
 							<div class="col-md-4 col-sm-4"></div>
 							
  						</div>

			</div>
						

					</div>
					
				</div>
	</div>;

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: false,
            fetching: false,
            error: undefined,
            password: ''
        };
    }

    resetPass() {
        const {password} = this.state;
        this.setState({fetching: true, error: undefined});
        const query = parse(location.search);
        return fetch(settings.urls.update_password, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': query.token},
            mode: 'cors',
            body: JSON.stringify({password})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, error: undefined, changePassword: true});
            })
            .catch(error=>this.setState({fetching: false, error: error.message}));
    }

    render() {
        const {changePassword, error, fetching, password} = this.state;
        if (changePassword)
            return <ChangeSuccess/>;
        return (
            <div className="container-fluid forgot-wrapper-background">
                <div className="row row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 forgot-padding">
                    
                        <div className="forgot-inner-box">
                        <h3 className="forgot-header">Reset Your Password</h3>
                            <input type="password" placeholder="New Password" className="forgot-input"
                                value={password} onChange={e=>this.setState({password: e.target.value})}/>
                            <input type="password" placeholder="Confirm New Password" className="forgot-input"/>
                            {error && <div className="forgot-validation-error">{error}</div>}
                            {fetching?
                                <div className="forgot-button"><img className="forgot-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="forgot-button" value="Change Password" onClick={()=>this.resetPass()}/>
                            }
                            
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }
}