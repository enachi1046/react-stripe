import React, {Component} from 'react';
import {User, EyeOff} from 'react-feather'
import Moment from 'react-moment';
export default class BlogComments extends Component{
    render(){
        let comments = this.props.reply
        return(
            <div className="container-fluid">
                
                {comments.map((stuff, id)=> 
            <div className="row-fluid forum-comment-row">
            
              
    <div className="col-md-2">
    </div>
    
    <div className="col-md-8">
    <div className="col-spacings help-box">
   
    <div className="row article-sub-row">
    

    <div className="col-md-2"><img className="forum-poster-img" src="https://api.adorable.io/avatars/260/forum_comment_image.png" /></div>
    <div className="col-md-10">

    <div className="row">

    <div className="col-md-6">
    <span className="forum-by"><span className="forum-poster-name">Paingha Joe Alagoa</span> said</span>
    <br/>
    <span className="forum-posted-date">Commented on 
    &nbsp;
            <Moment format="MMM Do, YYYY">
                {stuff.createdAt}
                </Moment>
    </span>
    </div>

    <div className="col-md-2"></div>
    <div className="col-md-4 forum-report"><EyeOff />&nbsp;Report</div>

    </div>

    <br/>
    <span className="content">{stuff.content}</span>
    
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
    )}    
    <div className="clearfix"></div>
    </div>
        );
    }
}