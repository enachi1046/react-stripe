import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import {connect} from 'react-redux';
import settings from '../../settings'
import Footer from '../shared/footer'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Search, BookOpen} from 'react-feather'
const ForumSuccess = () =>
<React.Fragment> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            <h1 className="home-headline">New Forum Post</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>
 
 <div className="row-fluid new-article-row">
    <div className="col-md-2">
    </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <svg id="successAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
            <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id="successAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
        </svg>
    </div>
    </div>
    </div>
    <div className="col-md-2">
    </div>
 </div>

<Footer />
</React.Fragment>    
;


export class NewForum extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            topic: '',
            editorState: EditorState.createEmpty(),
            created: false
        };
    }
/*
    fetchUser(token, user_id) {
        this.setState({isloading: true});
        if (token && user_id) {
            fetch(settings.urls.get_user.replace('{user_id}', user_id ), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': token},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, user: data})
            )
        }
    } */
    

    componentDidMount() {
        //this.fetchUser(localStorage.token, this.props.user_id);
    }


    componentWillReceiveProps(nextProps) {
       /* if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        } */
    }

    componentDidUpdate(previousProps, previousState) {
        /*if(previousState.results !== this.state.results) {
            this.fetchUser(localStorage.token, this.props.user_id);
          } */
        
    }
    onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
      };
    
    doPost(){
        const {isloading, editorState, topic, error} = this.state;
        console.log("Topic: " + topic);
        console.log("Content" + editorState);
        let content = editorState;
        let by = this.props.user_id
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.new_forum, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({topic, content, by})
        })
        .then(
            response => response.json()
        )
        .then(json=>{
            if (json.error)
                throw Error(json.error.message || 'Unknown fetch error');
            this.setState({fetching: false, error: undefined, created: true});
        })
        .catch(error=>this.setState({isloading: false, error: error.message}));
    }
    render(){
        let { isloading, editorState, topic, created } = this.state;
        if (created)
        return <ForumSuccess/>;
     /*   if(!this.state.user){
            return <React.Fragment> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Scholarship Search</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="search-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1">
                        </div>
                                    <div className="col-md-10 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    <div className='text-input__loading--line2'></div>
                                    </div>

                                    </div>
                                    <div className="col-md-1">
                        </div>
                        </div>
                    </div>
                </section>
                
            </div> 
        </React.Fragment>
        } */
        
        let resultsBlock; 
        let noResult;
        
        /*if(noneResult){
            noResult = (
                <NoResult />
            );
        } 
        if (isloading == true){
            resultsBlock = (
                <LoadingResult />
            );
            
        }
        else{
            resultsBlock = (
                <ScholarshipResult search={results}/>
                );
            
        } */
        
            return <React.Fragment> 
            <div className="row">
                <section className="help-center-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">New Forum Post</h1>
                        
                        </div>
                    </div>
                    </div>
                </section>
            </div>
             
             <div className="row-fluid new-article-row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                <div className="col-spaced help-box">
               
                <div className="row article-sub-row">
                <input type="text" placeholder="Forum Post Topic" className="register-input"
                                value={topic} onChange={e=>this.setState({topic: e.target.value})}/>
                <Editor
                    initialEditorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                {isloading?
                                <div className="register-button"><img className="register-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="navbar-btn" value="Create Post" onClick={()=>this.doPost()}/>
                            }
                </div>
                </div>
                <div className="col-md-2">
                </div>
             </div>

            <Footer />
        </React.Fragment>   
        
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(NewForum);