import React, {Component} from "react";
import settings from '../../settings';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const MAJORS = [
	{ label: 'Business', value: 'Business' },
	{ label: 'Nursing', value: 'Nursing' },
	{ label: 'Computer Science', value: 'Computer Science' },
	{ label: 'Computer Engineering', value: 'Computer Engineering' },
	{ label: 'Liberal Art', value: 'Liberal Art' },
    { label: 'Criminal Justice', value: 'Criminal Justice' },
    { label: 'Electrical Engineering', value: 'Electrical Engineering' },
    { label: 'Environmental Engineering', value: 'Environmental Engineering' },
    { label: 'Anthropology', value: 'Anthropology' },
    { label: 'English Language', value: 'English Language' },
    { label: 'History', value: 'History' },
    { label: 'Sociology', value: 'Sociology' },
    { label: 'Information Technology', value: 'Information Technology' },
    { label: 'Communication', value: 'Communication' },
    { label: 'Accounting', value: 'Accounting' },
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Economics', value: 'Economics' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Business and Advertisement', value: 'Business and Advertisement' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Science', value: 'Science' },
    { label: 'Real Estate', value: 'Real Estate'}
];
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
	{ label: 'Undergraduate', value: 'Undergraduate' }
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
const SCHOLARSHIPCOUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const APPLICANTCOUNTRIES = [
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'Tanzania', value: 'Tanzania' },
    { label: 'Rwanda', value: 'Rwanda' },
    { label: 'Mali', value: 'Mali' },
    { label: 'Pakistan', value: 'Pakistan' },
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const CRITERIAS = [
	{ label: 'Merit', value: 'Merit' },
    { label: 'Need', value: 'Need' }
];
export class GetStarted extends Component{
    constructor(props){
        super(props)
        this.state = {
            major:"",
            applicantCountry:"",
            scholarshipCountry:"",
            gpa:"",
            criteria:"",
            level:"",
            firstLogin: false,
            profileComplete: false,
            error: null,
            isloading: false
        };
        this.handleGpaChange = this.handleGpaChange.bind(this);
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleScholarshipCountryChange = this.handleScholarshipCountryChange.bind(this);
        this.handleApplicantCountryChange = this.handleApplicantCountryChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
    }
    handleCriteriaChange (criteria) {
		console.log('You\'ve selected:', criteria);
		this.setState({ criteria }, ()=>{
            console.log(this.state.criteria)
        });
    }
    handleGpaChange (gpa) {
		console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            console.log(this.state.gpa)
        });
    }

    handleLevelChange (level) {
		console.log('You\'ve selected:', level);
		this.setState({ level });
    }

    handleMajorChange (major) {
		console.log('You\'ve selected:', major);
		this.setState({ major }, ()=>{
            console.log(this.state.major)
        });
    }

    handleScholarshipCountryChange (scholarshipCountry) {
		console.log('You\'ve selected:', scholarshipCountry);
		this.setState({ scholarshipCountry });
    }
    
    handleApplicantCountryChange (applicantCountry) {
		console.log('You\'ve selected:', applicantCountry);
		this.setState({ applicantCountry });
    }
    UpdateProfile(){
        this.Started(localStorage.token, this.props.user_id)
    }
    Started(token, user_id) {
        const {major, applicantCountry, scholarshipCountry, gpa, criteria, level, firstLogin, error, isloading, profileComplete} = this.state
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.update_user.replace('{user_id}', user_id ), {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            mode: 'cors',
            body: JSON.stringify({major, applicantCountry, scholarshipCountry, gpa, criteria, level, firstLogin})
        })
        .then(
            response => response.json()
        )
        .then(json=>{
            if (json.error)
                throw Error(json.error.message || 'Unknown fetch error');
            this.setState({fetching: false, error: undefined, profileComplete: true});
        })
        .catch(error=>this.setState({isloading: false, error: error.message}));
    
    }
    render(){
        const {major, applicantCountry, scholarshipCountry, gpa, criteria, level, profileComplete, isloading, error} = this.state
        const options = MAJORS;
        const applicantcountry = APPLICANTCOUNTRIES;
        const levels = LEVELS;
        const gpas = GPAS;
        const criterias = CRITERIAS;
        const scholarshipcountry = SCHOLARSHIPCOUNTRIES;
        if (profileComplete)
            return <Redirect to={{
                pathname: '/'
            }}/>;

        return(
            <div className="container-fluid getstarted-wrapper-background">
            
                <div className="row getstarted-wrapper-background getstartedrow-height">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 getstarted-padding">
                        <div className="getstarted-inner-box">
                        <h3 className="getstarted-header">Update Your Profile</h3>
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={criteria}
                                            onBlurResetsInput={false}
					                        onSelectResetsInput={false}
                                            placeholder="Criteria"
                                            simpleValue
                                            multi={false}
                                            clearable={true}
                                            onChange={this.handleCriteriaChange}
                                            options={criterias}
                                            searchable={false}
                                        />
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={level}
                                            placeholder="Level"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleLevelChange}
                                            options={levels}
                                            searchable={false}
                                        />
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={gpa}
                                            placeholder="Your Gpa"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleGpaChange}
                                            options={gpas}
                                            searchable={false}
                                        />
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={major}
                                            placeholder="Your Major / Degree program"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleMajorChange}
                                            options={options}
                                            searchable={false}
                                        />
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={applicantCountry}
                                            placeholder="Your Country"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleApplicantCountryChange}
                                            options={applicantcountry}
                                        />
                            <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={scholarshipCountry}
                                            placeholder="Preferred Scholarship Country"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleScholarshipCountryChange}
                                            options={scholarshipcountry}
                                        />
                            {error && <div className="getstarted-validation-error">{error}</div>}
                            {isloading?
                                <div className="getstarted-button"><img className="getstarted-button-puff" src="/img/puff.svg"/></div>
                                :
                                <input type="submit" className="getstarted-button" value="Update My Profile" onClick={()=>this.UpdateProfile()}/>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                </div>
        )
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(GetStarted);