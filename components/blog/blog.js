import React, {Component} from 'react'
import Navbar from '../shared/navbar'
//import {connect} from 'react-redux';
import settings from '../../settings'
import Footer from '../shared/footer'
import {Search, BookOpen} from 'react-feather'
import {Link} from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import Pagination from "react-js-pagination";

export class Blog extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            error: null,
            noneResult: false,
            things: [],
            offset: 0,
            resultCount: 0,
            activePage: 1,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //(n-1)15
        let mathStuff = pageNumber - 1;
        let multiplyStuff = mathStuff * 10;
        this.setState({activePage: pageNumber, offset: multiplyStuff }, ()=>{
            this.fetchBlog();
            window.scrollTo(0, 0);
        });
         
    }
    fetchBlog() {
        const {offset} = this.state
        this.setState({isloading: true});
            fetch(settings.urls.get_blog.replace('{off}', offset), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            })
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({isloading: false, things: data.rows, resultCount: data.count}, ()=>{
                    console.log(data);
                    console.log("----------------------------------------------------");
                    console.log(this.state.things);
                })
            )
    } 
    

    componentDidMount() {
        this.fetchBlog();
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
        
        let { things, isloading, resultCount } = this.state;
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
                <section className="blog-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Blog</h1>
                        
                        </div>
                    </div>
                    
                    </div>
                </section>
            </div>
             

            <div className="row-fluid blog-row">
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                <div className="row-fluid">
                {this.state.things.map((stuff, id)=> 
                
                <div className="col-md-6">
                <div className="blog-col-spaced help-box">
                <img className="blog-list-img" src={`${stuff.featuredImage}`} />
                <div className="blog-spaced">
                <span className="word-wrap">
                    <Link to={`/blog/${stuff.id}/${stuff.urlParam}`}>
                    <TextTruncate
                    line={2}
                    truncateText="…"
                    text={stuff.topic}
                    />
                    </Link>
                    </span>
                
                </div>
                <div className="blog-content">
                <TextTruncate
                    line={3}
                    truncateText="…"
                    text={`${stuff.content}`.replace(/<[^>]+>/g, '')}
                    />
                </div>
                </div>
                </div>
            )}
                </div>
                </div>
                <div className="col-md-1">
                </div>
            </div>
            <div className="row">
            <div className="spacing-here">
            </div>
            </div>
            {things.length > 0 ?
            <div className="row pagination-row">
            <div className="col-md-4"></div>
            <div className="col-md-4 pagination-col">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={resultCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            />
            </div>
            <div className="col-md-4"></div>
            </div>
             : null }
            <Footer />
        </div>   
        
    }
}
