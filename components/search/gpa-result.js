import React, {Component} from 'react'
//import {connect} from 'react-redux';
import settings from '../../settings'
import {Search, DollarSign, Calendar, Edit, Link} from 'react-feather'
import TextTruncate from 'react-text-truncate';
import NumberFormat from 'react-number-format';
export default class GpaResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            error: null,
            school: '',
            criteria: '',
            level: '',
            saved: false
        };
    }
    clickSave() {
        document.getElementById('save').classList.replace("heart", "is_animating");
        this.setState({
            saved: true
        })
    }


    componentDidMount() {
        
    }

    render(){
/*        if(!this.state.user){
            return <div> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">Loading...</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="profile-section-2">
                    <div className="story-box">
                        <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                    
                                    <div>Loading</div>
                                    
                                    </div>
                        </div>
                    </div>
                </section>
            </div> 
        </div>
        } */
        let { criteria, level, school } = this.state;
        let schoolResults = this.props.school;
        /*let newBlock;
        let {createdAt} = schoolResults
        let deadlineFrame = moment(createdAt, "YYYYMMDD").fromNow();
        if (deadline != null && deadlineFrame) createdAt is less than 2weeks old show new ribbon*/
            return <div>
            <div className="row">
                <section className="search-result-section-2">
                    <div className="story-box">
                    {schoolResults.map((school, id)=>
                        <div className="row">
                        <div className="col-md-1">
                        </div>

                                    
                                    <div key={id} className="col-md-10 col-sm-12">
                                    <div className="col-spaced box">
                                    <div className="ribbon-wrapper-green"><div className="ribbon-green">NEW</div></div>
                                    <div className="row">
                                        <div className="col-md-4">
                                        <h3 className="word-wrap"><TextTruncate
                                            line={2}
                                            truncateText="…"
                                            text={school.name} /></h3>
                                        </div>
                                        <div className="col-md-3">
                                        <div className="aligner"><h3>SAT: </h3>

                                        <span className="search-info"><h3>{ school.sat!=null ? `${school.sat}` : 'N/A'}</h3></span></div>
                                        </div>
                                        <div className="col-md-3">
                                        <div className="aligner"><h3>ACT: </h3>
                                        <span className="search-info"><h3>{ school.act!=null ? `${school.act}` : 'N/A'}</h3></span></div>
                                        </div>
                                        <div className="col-md-2">
                                        </div>
                                    </div>
                                    
                                    <div className="row search-push-down">
                                        <div className="col-md-2">
                                        <h4>GPA: 
                                        <NumberFormat value={school.gpa} displayType={'text'} decimalScale={1} decimalSeparator={'.'} fixedDecimalScale={true}/>
                                        </h4>
                                        </div>
                                        <div className="col-md-2">
                                        <h4>STATE: {school.state}</h4>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-3">
                                        
                                        </div>
                                        <div className="col-md-4">
                                        <a href={school.website} target="_blank" className="search-btn aligner"><Link className="user-icon"/> <span className="user-info">Visit</span></a>
                                        
                                        </div>
                                    </div>
                                    
                                    </div>

                                    </div>
                                    <div className="col-md-1">
                        </div>
                        </div>
                    )}
                    </div>
                </section>
            </div> 
            </div> 
        
    }
}
