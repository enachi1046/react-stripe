import React, {Component} from 'react'
import Navbar from '../shared/navbar'
//import {connect} from 'react-redux';
import settings from '../../settings'
import Footer from '../shared/footer'
import {Search, BookOpen} from 'react-feather'
import {Link} from 'react-router-dom';
export class Forum extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            noneResult: false,
            things: [],
            offset: 0,
        };
    }

    fetchForum() {
        this.setState({isloading: true});
            fetch(settings.urls.get_forum, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, things: data}, ()=>{
                    console.log(data);
                    console.log("----------------------------------------------------");
                    console.log(this.state.things);
                })
            )
    } 
    

    componentDidMount() {
        this.fetchForum();
        window.scrollTo(0, 0);
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
    render(){
        
        let { thingss, isloading } = this.state;
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
        
            return <div className="container-fluid"> 
            <div className="row">
                <section className="help-center-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Forum</h1>
                        
                        </div>
                    </div>
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                    <div className="headline-box">
                    <form className="help-center-search">
                        <input type="text" className="help-center-search-input" placeholder="Need Help?"/>
                        <button className="help-center-search-btn">Search</button>
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>
                </section>
            </div>
             
             <div className="row-fluid recent-article-row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                <div className="col-spaced help-box">
                <h2>Recent Articles</h2>
                
                <div className="row article-sub-row">
                {this.state.things.map((stuff, id)=> 
                    <div className="col-md-6">
                    <span className="word-wrap">
                    <BookOpen className="book-align" />&nbsp;<Link to={`/forum/${stuff.urlParam}/${stuff.id}`}>{stuff.topic}</Link>
                    </span>
                    </div>
                    )}
                </div>
               
                {/* <h4 className="view-more">View More</h4> */}
                <button className="getstarted-button">View More</button>
                </div>
                </div>
                <div className="col-md-2">
                </div>
             </div>
             <div className="row-fluid more-help-row">
             <h2 className="more-help-heading">Still Need Help?</h2>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                <div className="row-fluid">
                <div className="col-md-4">
                <div className="col-spaced help-box">
                </div>
                </div>
                <div className="col-md-4">
                <div className="col-spaced help-box">
                </div>
                </div>

                <div className="col-md-4">
                <div className="col-spaced help-box">
                </div>
                </div>
                </div>
                </div>
                <div className="col-md-1">
                </div>
            </div>

            <Footer />
        </div>   
        
    }
}
