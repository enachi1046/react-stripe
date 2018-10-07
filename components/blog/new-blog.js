import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import {connect} from 'react-redux';
import settings from '../../settings'
import Footer from '../shared/footer'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Search, BookOpen} from 'react-feather'
import Dropzone from 'react-dropzone'
const BlogSuccess = () =>
<React.Fragment> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            <h1 className="home-headline">New Blog Post</h1>
            
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


export class NewBlog extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            image: null,
            topic: '',
            key: '',
            signedRequest: null,
            awsURL: '',
            editorState: EditorState.createEmpty(),
            created: false
        };
    }

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
    
    /*onDrop(file) {
        let arrayFile = file.map(f => {
            let fileExt = f.name.split('.').pop();
        let contentExt = 'image/' + fileExt;
        let fileName = Date.now() + f.name;
        this.setState({
            image: file,
          extension: fileExt,
          contentType: contentExt,
          fileKey: fileName
        },()=>{
            console.log(fileExt)
            console.log(contentExt)
            console.log(fileName)
            this.requestURL();
        });
        })
        
      }*/
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
        //start
        if(this.fileUpload.files[0] != null) {
            // Upload image to S3
            const file = this.fileUpload.files[0];
            const fileKey = Date.now() + file.name;
            const contentType = file.type;
            const extension = file.type
        //const {key, signedRequest, featuredImage} = this.state;
        this.setState({isloading: true});
        //change to put
            fetch(settings.urls.upload, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                mode: 'cors',
                body: JSON.stringify({contentType, extension, fileKey})
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, key: data.key, signedRequest: data.signedRequest}, ()=>{
                   
                    console.log(data.url);
                    ///then
                    let thingy = this.fileUpload.files[0];
                    let uri = data.url;
                    const contentType = thingy.type
        const {signedRequest} = this.state;
        this.setState({isloading: true}, ()=>{
            console.log("2nd");
        });
        //change to put
            fetch(signedRequest, {
                method: 'PUT',
                headers: {'Content-Type': contentType},
                body: thingy
            })
                .then(response=>{
                    this.setState({isloading: false}, ()=>{
                        console.log("done")
                        setTimeout(()=>{
                            this.setState({isloading: true, error: undefined});
                            let featuredImage = uri;
                        return fetch(settings.urls.new_blog, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
                            mode: 'cors',
                            body: JSON.stringify({topic, content, by, featuredImage})
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
                        }, 4000)
                        
                    })
                })
                })
            )
        }
        //
        
    }
    render(){
        let { isloading, editorState, topic, created, image } = this.state;
        if (created)
        return <BlogSuccess/>;
        
        let resultsBlock; 
        let noResult;
        
            return <React.Fragment> 
            <div className="row">
                <section className="help-center-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">New Blog Post</h1>
                        
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
                <input type="text" placeholder="Blog Post Topic" className="register-input"
                                value={topic} onChange={e=>this.setState({topic: e.target.value})}/>
                <input type="file" className="image-upload" accept="image/*" ref={ref => this.fileUpload = ref}/>
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


export default connect(mapper)(NewBlog);