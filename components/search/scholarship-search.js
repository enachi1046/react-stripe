import React, {Component} from 'react'
import Navbar from '../shared/navbar'
import Footer from '../shared/footer'
import {connect} from 'react-redux';
import _ from 'lodash'
import settings from '../../settings'
import LoadingResult from './loading-result'
import NoResult from './no-result'
import {Search} from 'react-feather'
import {Redirect} from 'react-router-dom';
import { parse } from 'query-string';
import Select from 'react-select';
import Pagination from "react-js-pagination";
import cookie from 'react-cookies'
import 'react-select/dist/react-select.css';
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import ScholarshipResult from './scholarship-result'
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

const AMOUNTS = [
	{ label: '$0 - $5,000', value: '$0 - $5,000' },
	{ label: '$5,000 - above', value: '$5,000 above' },
	{ label: 'Full Tuition', value: 'Full tuition' },
	{ label: 'Variable', value: 'Variable' },
];
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const COUNTRIES = [
	{ label: 'US', value: 'US' },
	{ label: 'Canada', value: 'Canada' }
];
const CRITERIAS = [
	{ label: 'Merit', value: 'Merit' },
    { label: 'Need', value: 'Need' },
    { label: 'Other', value: 'Other' }
];
const APPLICANTCOUNTRIES = [
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'South Africa', value: 'South Africa' }
];
export class ScholarshipSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            user: null,
            criteria: '',
            level: '',
            Majors: '',
            amount: '',
            country: '',
            applicantCountry: '',
            gpa: '',
            deadline: '',
            placeholder: 'Criteria',
            error: null,
            noneResult: false,
            results: [],
            resultCount: 0,
            offset: 0,
            open: false,
            opened: false,
          showCloseIcon: false,
          CloseIcon: true,
          activePage: 1,
          noneModal: 0,
          refresh: false,
          noCoin: false,
          resultObj: {},
          stuffs: null,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleApplicantCountryChange = this.handleApplicantCountryChange.bind(this);
        this.handleGpaChange = this.handleGpaChange.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.OpenModal = this.OpenModal.bind(this);   
        this.CloseShareModal = this.CloseShareModal.bind(this);
        this.createCookie = this.createCookie.bind(this);
    }
    createCookie(){
        const expires = new Date()
        expires.setDate(expires.getDate() + 3)
        cookie.save('noModal', 1, 
        {
            path: '/scholarship-search',
            expires,
            maxAge: 259200,
          }
    )
    this.CloseShareModal();
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //(n-1)15
        let mathStuff = pageNumber - 1;
        let multiplyStuff = mathStuff * 15;
        this.setState({activePage: pageNumber, offset: multiplyStuff }, ()=>{
            this.Search();
            window.scrollTo(0, 0);
        });
         
    }

    handleApplicantCountryChange(applicantCountry){
        this.setState({ applicantCountry });
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

    handleMajorChange (Majors) {
		console.log('You\'ve selected:', Majors);
		this.setState({ Majors }, ()=>{
            console.log(this.state.Majors)
        });
    }

    handleAmountChange (amount) {
		console.log('You\'ve selected:', amount);
		this.setState({ amount });
    }
    
    handleCountryChange (country) {
		console.log('You\'ve selected:', country);
		this.setState({ country });
    }
    onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false });
      };
      OpenModal() {
        this.setState({ opened: true });
      };
      CloseShareModal(){
        this.setState({ opened: false });
      }
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
    }
    handleGpaChange (gpa) {
		console.log('You\'ve selected:', gpa);
		this.setState({ gpa }, ()=>{
            console.log(this.state.gpa)
        });
    }
    refreshResults(){
        this.setState({refresh: !this.state.refresh}, ()=>{
            this.Search();
        })
    }
    componentDidMount() {
        let cookieStuff = cookie.load('noModal') || 0;
        this.setState({ noneModal: cookieStuff})
        this.fetchUser(localStorage.token, this.props.user_id);
        const query = parse(location.search);
        if (query.search_callback == "true"){
            this.setQuery(localStorage.token, this.props.user_id);
        }
    }

    setQuery(token, user_id){
        const query = parse(location.search);
        let editedMajor = query.major.replace(/([-]+)/g,",");
        let majorRay = [];
        majorRay.push(editedMajor);
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
                data => this.setState({isloading: false, user: data, major: majorRay, criteria: query.criteria, level: query.level, gpa: query.gpa, applicantCountry: query.applicant_country, country: query.country, amount: query.amount, offset: query.offset}, ()=>{
                    this.Search();
                })
            )
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.user_id && !!nextProps.user_id && !this.state.user) {
            this.fetchUser(localStorage.token, nextProps.user_id);
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if(previousState.results !== this.state.results) {
            this.fetchUser(localStorage.token, this.props.user_id);
          }
          if(previousState.offset !== this.state.offset) {
            this.Search();
          }
    }
    noCoin(){
        //this.onOpenModal();
        //do fetch here for one result
        const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, Majors} = this.state;
        let major = [];
        let offset = 0;
        major.push(Majors);
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.no_coin, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount, offset})
        })
        .then(
            response => response.json()
        )
        .then(
            data => {
                this.setState({isloading: false, resultObj: data, noCoin: true},()=>{
                    console.log('coin', data)
                })
        
        })
    }
    Search() {
        let {offset} = this.state;
        let {id,coin} = this.state.user;
        // if(coin < 1 && offset < 15){
        //     this.noCoin();
        // }
        // else{
        const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, Majors} = this.state;
        let user_id = id;
        let major = [];
        major.push(Majors);
        this.setState({isloading: true, error: undefined});
        return fetch(settings.urls.scholarship_search, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount, user_id, offset})
        })
        .then(            
            response => response.json()                        
        )
        .then(
            data => {
                if(data.length != 0){
                this.setState({isloading: false, results: data.rows, resultCount: data.count}, ()=>{
                    //show share modal
                    console.log('results', this.state.results)
        let savedItems = _.map(this.state.results, function(currentObject) {
            return _.pick(currentObject, "id");
        });
        console.log('savedItems',savedItems)
        let result = savedItems.map(v => v.visible = true)
          this.setState({stuffs: result},()=>{
              console.log('stuff',this.state.stuffs)
          })
                    this.OpenModal();
                })
        }else{
            this.setState({isloading: false, noneResult: true})
        }
        }
        )
    // }
    }

    render(){

        if(!this.state.user){
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
        }
        let { open, stuffs, resultObj, noCoin, noneModal, opened, resultCount, offset, showCloseIcon, CloseIcon, noneResult, criteria, level, applicantCountry, gpa, amount, value, deadline, country, placeholder, Majors, results, isloading } = this.state;
        let resultsBlock;
        let noResult;
        let arrayString = Majors.toString().replace(/([,]+)/g,"-");
        let urlParams = `/buy_coin?search_callback=true&criteria=${criteria}&level=${level}&amount=${amount}&gpa=${gpa}&applicant_country=${applicantCountry}&country=${country}&major=${arrayString}&offset=${offset}`
        if(noneResult){
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
                <ScholarshipResult visibility={stuffs} noCoinObj={resultObj} coin={noCoin} refresh={this.refreshResults} currentUser={this.state.user}/*none={noneResult}*/search={results}/>
                );
            
        }
        const options = MAJORS;
        const amounts = AMOUNTS;
        const gpas = GPAS;
        const levels = LEVELS;
        const criterias = CRITERIAS;
        const countries = COUNTRIES;
        const applicantCountries = APPLICANTCOUNTRIES;
        const {pathname} = this.props.location;
        const {referralCode} = this.state.user
            return <div> 
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
                                    <div className="row">
                                        <div className="col-md-4">
                                        <Select
                                            name="applicantcountry"
                                            className="major-select"
                                            value={applicantCountry}
                                            onBlurResetsInput={false}
					                        onSelectResetsInput={false}
                                            placeholder="Applicant Country"
                                            simpleValue
                                            multi={false}
                                            clearable={true}
                                            onChange={this.handleApplicantCountryChange}
                                            options={applicantCountries}
                                            searchable={false}
                                        />
                                        </div>
                                        <div className="col-md-4">
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
                                       </div>
                                        <div className="col-md-4">
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
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
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
                                        <div className="col-md-4">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={country}
                                            placeholder="Country"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleCountryChange}
                                            options={countries}
                                        />
                                        </div>
                                        <div className="col-md-4">
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={amount}
                                            placeholder="Amount"
                                            multi={false}
                                            simpleValue
                                            onChange={this.handleAmountChange}
                                            options={amounts}
                                            searchable={false}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                        
                                        <Select
                                            name="form-field-name"
                                            className="major-select"
                                            value={Majors}
                                            placeholder="Majors"
                                            multi={true}
                                            simpleValue
                                            onChange={this.handleMajorChange}
                                            options={options}
                                            searchable={true}
                                        />
                                        </div>
                                        <div className="col-md-4">
                                        <button className="search-btn aligner" onClick={()=>this.Search()}><Search className="user-icon"/> <span className="user-info">Search</span></button>
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
            {noResult}
            {resultsBlock}
            {results.length > 0 ?
            <div className="row pagination-row">
            <div className="col-md-4"></div>
            <div className="col-md-4 pagination-col">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={15}
            totalItemsCount={resultCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            />
            </div>
            <div className="col-md-4"></div>
            </div>
             : null }
            
             <Footer />
           
            <Modal className="video-modal coin-modal" open={open} onClose={this.onCloseModal} showCloseIcon={showCloseIcon} little>
                <h1>Your Search cannot be completed because you do not have enough coins</h1>
                <p>Buy Coin to continue search</p>
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><a href={urlParams} className="navbar-btn aligner"><span className="user-info">Buy Coin</span></a></div>
                <div className="col-md-4"></div>
                </div>
            </Modal>
            { noneModal == 0 ?
            <Modal className="video-modal share-modal" open={opened} onClose={this.CloseShareModal} showCloseIcon={CloseIcon} little>
                <h3 className="result-count">{resultCount} results Found</h3>
                <h1>Share Scholarships to Friends</h1>
                
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <a className="btn-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=https://theacademist.herokuapp.com/register?ref=${referralCode}`}>Share on Facebook</a><br/>
                <a className="btn-twitter" href={`https://www.twitter.com/intent/tweet?url=https://theacademist.herokuapp.com/register?ref=${referralCode}&via=TWITTER_HANDLE_HERE&text="I just found ${resultCount} scholarships on The Academist"`}>Share on Twitter</a><br/>
                <a className="btn-linkedin" href={`http://www.linkedin.com/shareArticle?mini=true&url=https://theacademist.herokuapp.com/register?ref=${referralCode}&title="I just found ${resultCount} scholarships on The Academist"&source="The Academist"`}>Share on LinkedIn</a>
                <br/>
                <a onClick={this.createCookie} className="hide-modal">Don't Show Again</a>
                </div>
                <div className="col-md-2"></div>
                </div>
            </Modal> :
            null
            }
        </div>   
        
    }
}

function mapper(state) {
    return {
        user_id: state.user.data && state.user.data.id
    }
}


export default connect(mapper)(ScholarshipSearch);