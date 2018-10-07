import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import settings from '../../settings'
import {SearchTabs} from './school-search'
import GpaResult from './gpa-result'
import LoadingResult from './loading-result'
import {Search} from 'react-feather'
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
//import ScholarshipResult from './scholarship-result'

const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const GPAS = [
    { label: '2.0', value: '2.0' },
    { label: '2.1', value: '2.1' },
    { label: '2.2', value: '2.2' },
    { label: '2.3', value: '2.3' },
    { label: '2.4', value: '2.4' },
    { label: '2.5', value: '2.5' },
    { label: '2.6', value: '2.6' },
    { label: '2.7', value: '2.7' },
    { label: '2.8', value: '2.8' },
    { label: '2.9', value: '2.9' },
    { label: '3.0', value: '3.0' },
    { label: '3.1', value: '3.1' },
    { label: '3.2', value: '3.2' },
    { label: '3.3', value: '3.3' },
    { label: '3.4', value: '3.4' },
    { label: '3.5', value: '3.5' },
    { label: '3.6', value: '3.6' },
    { label: '3.7', value: '3.7' },
    { label: '3.8', value: '3.8' },
    { label: '3.9', value: '3.9' },
    { label: '4.0', value: '4.0' }
];
const USSTATE = [
	{ label: 'AL', value: 'AL' },
    { label: 'AK', value: 'AK' },
    { label: 'AS', value: 'AS' },
    { label: 'AZ', value: 'AZ' },
    { label: 'AR', value: 'AR' },
    { label: 'CA', value: 'CA' },
    { label: 'CO', value: 'CO' },
    { label: 'CT', value: 'CT' },
    { label: 'DE', value: 'DE' },
    { label: 'DC', value: 'DC' },
    { label: 'FM', value: 'FM' }
];
const CANSTATE = [
    { label: 'OTTAWA', value: 'OTTAWA' },
    { label: 'ONTARIO', value: 'ONTARIO' },
    { label: 'LONDON', value: 'LONDON' },
]



export class ByGpa extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            level: '',
            state: '',
            country: '',
            gpa: '',
            USstate: true,
            error: null,
            results: []
        };
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    handleCriteriaChange (criteria) {
		console.log('You\'ve selected:', criteria);
		this.setState({ criteria }, ()=>{
            console.log(this.state.criteria)
        });
    }

    handleLevelChange (level) {
		console.log('You\'ve selected:', level);
		this.setState({ level });
    }

    handleGpaChange (gpa) {
		console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            console.log(this.state.gpa)
        });
    }

    handleStateChange (state) {
		console.log('You\'ve selected:', state);
		this.setState({ state });
    }
    
    handleCountryChange (country) {
		console.log('You\'ve selected:', country);
        this.setState({ country }, ()=>{;
        if (country == "Canada"){
            this.setState({USstate: false})
        }
        else{
            this.setState({USstate: true})
        }
    })
    }

    DoSearch(){
        this.Search(localStorage.token, this.props.user_id)
    }
    Search(token, user_id) {
        const {gpa, state, level, isloading, results, error} = this.state
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.gpa_search, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            mode: 'cors',
            body: JSON.stringify({gpa, state, level})
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, results: data}, () => {
                console.log(this.state.results)
            })
        )
        
    }

    render(){

        let { state, level, gpa, country, USstate, isloading, results} = this.state;
        const gpas = GPAS;
        const levels = LEVELS;
        const states = USSTATE;
        const canstate = CANSTATE;
        let SelectBlock;
        let resultsBlock
        /*if (USstate){
            SelectBlock = (
                <Select
                 name="state"
                className="gpa-select"
                value={state}
                placeholder="Pick a State"
                multi={false}
                simpleValue
                onChange={this.handleStateChange}
                options={states}
                searchable={false}
                />
            )
        }
        else{
            SelectBlock = (
                <Select
                 name="state"
                className="gpa-select"
                value={state}
                placeholder="Pick a State"
                multi={false}
                simpleValue
                onChange={this.handleStateChange}
                options={canstate}
                searchable={false}
                />
            )
        }*/
        if (isloading == true){
            resultsBlock = (
                <LoadingResult />
            );
            
        }
        else{
            resultsBlock = (
                <GpaResult /*none={noneResult}*/ school={results}/>
                );
            
        }
        const countries = COUNTRIES;
            return <div> 
            <div className="row">
                <section className="profile-section">
                    <Navbar />  
                    <div className="row-fluid hero-box">
                    <div className="col-md-12">
                        <div className="headline-box">
                        <h1 className="home-headline">School Search By Gpa</h1>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    </div>
                </section>
            </div>
            <div className="row">
                <section className="school-search-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1">
                        </div>
                                    <div className="col-md-10 col-sm-12">
                                    
                                    <div className="col-spaced box">
                                    <SearchTabs />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                            name="gpa"
                                            className="gpa-select"
                                            value={gpa}
                                            placeholder="GPA"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleGpaChange}
                                            options={gpas}
                                            searchable={false}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        <Select
                                            name="level"
                                            className="gpa-select"
                                            value={level}
                                            placeholder="Level"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleLevelChange}
                                            options={levels}
                                            searchable={false}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Select
                                        name="state"
                                        className="gpa-select"
                                        value={state}
                                        placeholder="Pick a State"
                                        multi={false}
                                        simpleValue
                                        onChange={this.handleStateChange}
                                        options={states}
                                        searchable={false}
                                        />
                                        </div>
                                        
                                        <div className="col-md-6">
                                        <button className="search-btn aligner" onClick={()=>this.DoSearch()}><Search className="user-icon"/> <span className="user-info">Search</span></button>
                                       
                                        </div>
                                    </div>
                                    
                                    </div>

                                    </div>
                                    <div className="col-md-1">
                        </div>
                        </div>
                    </div>
                </section>
                
            </div> 
            {resultsBlock}
            <Footer />
        </div>   
        
    }
}
function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(ByGpa);