import React, {Component} from 'react'
import {connect} from 'react-redux';
import {requestLogin, receiveLogin, errorLogin} from '../../actions/user';
import settings from '../../settings';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {login: '', password:''};
    }

    doLogin(login, password) {
        const {dispatch, history, location} = this.props;
        console.log('location', location)
        dispatch(requestLogin());
        return fetch(settings.urls.login, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email: login, password: password})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(receiveLogin(json));
                localStorage.token = json.token;
                if (!json.user.firstLogin){
                history.push(location.state? location.state.from : {pathname: '/'});
                }
                else{
                    history.push(location.state? location.state.from : {pathname: '/get-started'});  
                }
            })
            .catch(error=>dispatch(errorLogin(error.message)));
    }


    render() {
        const {login, password} = this.state;
        const {is_fetching, error} = this.props;
        return (
            <div className="container-fluid login-wrapper-background">
                <div className="row login-row-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 login-padding">
                        <div className="login-inner-box">
                        <h3 className="login-header">Login</h3>
                            <input type="email" placeholder="Email" className="login-input"
                                   value={login} onChange={e=>this.setState({login: e.target.value})}/>
                            <input type="password" placeholder="Password" className="login-input"
                                   value={password} onChange={e=>this.setState({password: e.target.value})}/>
                            {error && <div className="d-flex text-danger">{error}</div>}
                            {this.props.is_fetching?
                                <div className="login-button"><img className="login-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="login-button" value="Login" onClick={()=> this.doLogin(login, password)}/>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }
}

function mapper(state) {
    return {
        is_fetching: state.user.is_fetching,
        error: state.user.error
    }
}

export default connect(mapper)(Login);