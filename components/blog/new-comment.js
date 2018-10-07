import React, {Component} from 'react';
import {User, EyeOff} from 'react-feather'
import Moment from 'react-moment';
import { Match, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import settings from '../../settings'

export class NewBlogComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading: false,
            error: null,
            idUser: '',
            lastName: '',
            firstName: '',
            content: '',
            created: false,
        }
        this.postComment = this.postComment.bind(this);
    }
    componentDidMount() {        
        this.fetchUser(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
       if (!this.props.user_id && !!nextProps.user_id) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        } 
    }
    fetchUser(token, user_id) {
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.show_info.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, idUser: data.id, firstName: data.firstName, lastName: data.lastName})
            )
        }
    }
    postComment(){
        const {isloading, error, content, created} = this.state;
        let by = this.state.idUser;
        let blogId = this.props.parentBlog;        
        this.setState({isloading: true, error: undefined});
        console.log(content);
        console.log(by);
        console.log(blogId)
        return fetch(settings.urls.new_comment, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({content, by, blogId})
        })
        .then(
            response => response.json()
        )
        .then(json=>{            
            this.props.getblog(blogId);
            if (json.error)
                throw Error(json.error.message || 'Unknown fetch error');
            this.setState({isloading: false, error: undefined, content: ''})    
        })
        .catch(error=>this.setState({isloading: false, error: error.message}));
    }
    
    render(){
        let {firstName, lastName, content} = this.state
        return(
            <div className="container-fluid">
                
                
            <div className="row-fluid forum-new-comment-row">
            
              
    <div className="col-md-2">
    </div>
    
    <div className="col-md-8">
    <div className="col-spacings help-box">
   
    <div className="row article-sub-row">
    

    <div className="col-md-2"><img className="forum-poster-img" src="https://api.adorable.io/avatars/260/forum_comment_image.png" /></div>
    <div className="col-md-10">

    <span className="content">
    <textarea placeholder="Comment Here" className="comment-input" value={content} onChange={e=>this.setState({content: e.target.value})}></textarea>
    </span><br/>
    <div className="row">

    <div className="col-md-6">
    <span className="forum-by">Signed In as <span className="forum-poster-name">{firstName} {lastName}</span></span>
    <br/>
    
    </div>

    <div className="col-md-2"></div>
    <div className="col-md-4 forum-report"><input type="submit" className="getstarted-button" value="Post Comment" onClick={()=>this.postComment()}/></div>

    </div>

    </div>
    </div>
    
    <div className="col-md-2">
    </div>
    </div>
        </div>
        
        <div className="col-md-2">
    </div>
    <div className="clearfix"></div>
    </div>  
       
    <div className="clearfix"></div>
    </div>
        );
    }
}

function mapper(state) {    
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(NewBlogComment);