import React, {Component} from 'react'
import {Compass} from 'react-feather'
import Section1 from './shared/section1'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { parse } from 'query-string';
import settings from '../settings';
import Modal from 'react-responsive-modal'
import Footer from './shared/footer'
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
    injectStripe,
  } from 'react-stripe-elements';
  import PaypalExpressBtn from 'react-paypal-express-checkout';
import config from '../config';
  const countryCurrency = [
        {"country" : "Afghanistan" , "currency_code" : "AFN"},
        {"country" : "Albania" , "currency_code" : "ALL"},
        {"country" : "Algeria" , "currency_code" : "DZD"},
        {"country" : "American Samoa" , "currency_code" : "USD"},
        {"country" : "Andorra" , "currency_code" : "EUR"},
        {"country" : "Angola" , "currency_code" : "AOA"},
        {"country" : "Anguilla" , "currency_code" : "XCD"},
        {"country" : "Antarctica" , "currency_code" : "XCD"},
        {"country" : "Antigua and Barbuda" , "currency_code" : "XCD"},
        {"country" : "Argentina" , "currency_code" : "ARS"},
        {"country" : "Armenia" , "currency_code" : "AMD"},
        {"country" : "Aruba" , "currency_code" : "AWG"},
        {"country" : "Australia" , "currency_code" : "AUD"},
        {"country" : "Austria" , "currency_code" : "EUR"},
        {"country" : "Azerbaijan" , "currency_code" : "AZN"},
        {"country" : "Bahamas" , "currency_code" : "BSD"},
        {"country" : "Bahrain" , "currency_code" : "BHD"},
        {"country" : "Bangladesh" , "currency_code" : "BDT"},
        {"country" : "Barbados" , "currency_code" : "BBD"},
        {"country" : "Belarus" , "currency_code" : "BYR"},
        {"country" : "Belgium" , "currency_code" : "EUR"},
        {"country" : "Belize" , "currency_code" : "BZD"},
        {"country" : "Benin" , "currency_code" : "XOF"},
        {"country" : "Bermuda" , "currency_code" : "BMD"},
        {"country" : "Bhutan" , "currency_code" : "BTN"},
        {"country" : "Bolivia" , "currency_code" : "BOB"},
        {"country" : "Bosnia-Herzegovina" , "currency_code" : "BAM"},
        {"country" : "Botswana" ,"currency_code" : "BWP"},
        {"country" : "Bouvet Island" ,"currency_code" : "NOK"},
        {"country" : "Brazil" ,"currency_code" : "BRL"},
        {"country" : "British Indian Ocean Territory" ,"currency_code" : "USD"},
        {"country" : "Brunei Darussalam" , "currency_code" : "BND"},
        {"country" : "Bulgaria" , "currency_code" : "BGN"},
        {"country" : "Burkina Faso" , "currency_code" : "XOF"},
        {"country" : "Burundi" , "currency_code" : "BIF"},
        {"country" : "Cambodia" , "currency_code" : "KHR"},
        {"country" : "Cameroon" , "currency_code" : "XAF"},
        {"country" : "Canada" , "currency_code" : "CAD"},
        {"country" : "Cape Verde" , "currency_code" : "CVE"},
        {"country" : "Cayman Islands" , "currency_code" : "KYD"},
        {"country" : "Central African Republic" ,"currency_code" : "XAF"},
        {"country" : "Chile" , "currency_code" : "CLP"},
        {"country" : "China" , "currency_code" : "CNY"},
        {"country" : "Christmas Island" , "currency_code" : "AUD"},
        {"country" : "Cocos (Keeling) Islands", "currency_code" : "AUD"},
        {"country" : "Colombia" , "currency_code" : "COP"},
        {"country" : "Comoros" , "currency_code" : "KMF"},
        {"country" : "Congo" , "currency_code" : "XAF"},
        {"country" : "Congo, Dem. Republic", "currency_code" : "CDF"},
        {"country" : "Cook Islands" , "currency_code" : "NZD"},
        {"country" : "Costa Rica" , "currency_code" : "CRC"},
        {"country" : "Croatia" , "currency_code" : "HRK"},
        {"country" : "Cuba" , "currency_code" : "CUP"},
        {"country" : "Cyprus" , "currency_code" : "EUR"},
        {"country" : "Czech Rep. ", "currency_code" : "CZK"},
        {"country" : "Denmark" , "currency_code" : "DKK"},
        {"country" : "Djibouti" , "currency_code" : "DJF"},
        {"country" : "Dominica" , "currency_code" : "XCD"},
        {"country" : "Dominican Republic" , "currency_code" : "DOP"},
        {"country" : "Ecuador" , "currency_code" : "ECS"},
        {"country" : "Egypt" , "currency_code" : "EGP"},
        {"country" : "El Salvador" , "currency_code" : "SVC"},
        {"country" : "Equatorial Guinea" , "currency_code" : "XAF"},
        {"country" : "Eritrea" , "currency_code" : "ERN"},
        {"country" : "Estonia" , "currency_code" : "EUR"},
        {"country" : "Ethiopia" , "currency_code" : "ETB"},
        {"country" : "European Union" , "currency_code" : "EUR"},
        {"country" : "Falkland Islands (Malvinas) ","currency_code" : "FKP"},
        {"country" : "Faroe Islands", "currency_code" : "DKK"},
        {"country" : "Fiji" , "currency_code" : "FJD"},
        {"country" : "Finland" , "currency_code" : "EUR"},
        {"country" : "France" , "currency_code" : "EUR"},
        {"country" : "French Guiana" , "currency_code" : "EUR"},
        {"country" : "French Southern Territories" ,"currency_code" : "EUR"},
        {"country" : "Gabon" , "currency_code" : "XAF"},
        {"country" : "Gambia" , "currency_code" : "GMD"},
        {"country" : "Georgia" , "currency_code" : "GEL"},
        {"country" : "Germany" , "currency_code" : "EUR"},
        {"country" : "Ghana" , "currency_code" : "GHS"},
        {"country" : "Gibraltar" , "currency_code" : "GIP"},
        {"country" : "Great Britain" , "currency_code" : "GBP"},
        {"country" : "Greece" , "currency_code" : "EUR"},
        {"country" : "Greenland" , "currency_code" : "DKK"},
        {"country" : "Grenada" , "currency_code" : "XCD"},
        {"country" : "Guadeloupe (French) ", "currency_code" : "EUR"},
        {"country" : "Guam (USA) ", "currency_code" : "USD"},
        {"country" : "Guatemala" , "currency_code" : "QTQ"},
        {"country" : "Guernsey" , "currency_code" : "GGP"},
        {"country" : "Guinea" , "currency_code" : "GNF"},
        {"country" : "Guinea Bissau", "currency_code" : "GWP"},
        {"country" : "Guyana" , "currency_code" : "GYD"},
        {"country" : "Haiti" , "currency_code" : "HTG"},
        {"country" : "Heard Island and McDonald Islands","currency_code" : "Australian Dollar" ,"currency_code" : "AUD"},
        {"country" : "Honduras" , "currency_code" : "HNL"},
        {"country" : "Hong Kong" , "currency_code" : "HKD"},
        {"country" : "Hungary" , "currency_code" : "HUF"},
        {"country" : "Iceland" , "currency_code" : "ISK"},
        {"country" : "India" , "currency_code" : "INR"},
        {"country" : "Indonesia" , "currency_code" : "IDR"},
        {"country" : "Iran" , "currency_code" : "IRR"},
        {"country" : "Iraq" , "currency_code" : "IQD"},
        {"country" : "Ireland" , "currency_code" : "EUR"},
        {"country" : "Isle of Man" , "currency_code" : "GBP"},
        {"country" : "Israel" , "currency_code" : "ILS"},
        {"country" : "Italy" , "currency_code" : "EUR"},
        {"country" : "Ivory Coast" , "currency_code" : "XOF"},
        {"country" : "Jamaica" , "currency_code" : "JMD"},
        {"country" : "Japan" , "currency_code" : "JPY"},
        {"country" : "Jersey" , "currency_code" : "GBP"},
        {"country" : "Jordan" , "currency_code" : "JOD"},
        {"country" : "Kazakhstan" , "currency_code" : "KZT"},
        {"country" : "Kenya" , "currency_code" : "KES"},
        {"country" : "Kiribati" , "currency_code" : "AUD"},
        {"country" : "Kuwait" , "currency_code" : "KWD"},
        {"country" : "Kyrgyzstan" , "currency_code" : "KGS"},
        {"country" : "Laos" , "currency_code" : "LAK"},
        {"country" : "Latvia" , "currency_code" : "LVL"},
        {"country" : "Lebanon" , "currency_code" : "LBP"},
        {"country" : "Lesotho" , "currency_code" : "LSL"},
        {"country" : "Liberia" , "currency_code" : "LRD"},
        {"country" : "Libya" , "currency_code" : "LYD"},
        {"country" : "Liechtenstein" , "currency_code" : "CHF"},
        {"country" : "Lithuania" , "currency_code" : "LTL"},
        {"country" : "Luxembourg" , "currency_code" : "EUR"},
        {"country" : "Macau" , "currency_code" : "MOP"},
        {"country" : "Macedonia" , "currency_code" : "MKD"},
        {"country" : "Madagascar" , "currency_code" : "MGF"},
        {"country" : "Malawi" , "currency_code" : "MWK"},
        {"country" : "Malaysia" , "currency_code" : "MYR"},
        {"country" : "Maldives" , "currency_code" : "MVR"},
        {"country" : "Mali" , "currency_code" : "XOF"},
        {"country" : "Malta" , "currency_code" : "EUR"},
        {"country" : "Marshall Islands" , "currency_code" : "USD"},
        {"country" : "Martinique (French)", "currency_code" : "EUR"},
        {"country" : "Mauritania" , "currency_code" : "MRO"},
        {"country" : "Mauritius" , "currency_code" : "MUR"},
        {"country" : "Mayotte" , "currency_code" : "EUR"},
        {"country" : "Mexico" , "currency_code" : "MXN"},
        {"country" : "Micronesia" , "currency_code" : "USD"},
        {"country" : "Moldova" , "currency_code" : "MDL"},
        {"country" : "Monaco" ,"currency_code" : "EUR"},
        {"country" : "Mongolia" , "currency_code" : "MNT"},
        {"country" : "Montenegro" , "currency_code" : "EUR"},
        {"country" : "Montserrat" , "currency_code" : "XCD"},
        {"country" : "Morocco" , "currency_code" : "MAD"},
        {"country" : "Mozambique" , "currency_code" : "MZN"},
        {"country" : "Myanmar" , "currency_code" : "MMK"},
        {"country" : "Namibia" , "currency_code" : "NAD"},
        {"country" : "Nauru" , "currency_code" : "AUD"},
        {"country" : "Nepal" , "currency_code" : "NPR"},
        {"country" : "Netherlands" , "currency_code" : "EUR"},
        {"country" : "Netherlands Antilles" , "currency_code" : "ANG"},
        {"country" : "New Caledonia (French) ", "currency_code" : "XPF"},
        {"country" : "New Zealand" , "currency_code" : "NZD"},
        {"country" : "Nicaragua" , "currency_code" : "NIO"},
        {"country" : "Niger" , "currency_code" : "XOF"},
        {"country" : "Nigeria" , "currency_code" : "NGN"},
        {"country" : "Niue" , "currency_code" : "NZD"},
        {"country" : "Norfolk Island" , "currency_code" : "AUD"},
        {"country" : "North Korea" , "currency_code" : "KPW"},
        {"country" : "Northern Mariana Islands" ,"currency_code" : "USD"},
        {"country" : "Norway" , "currency_code" : "NOK"},
        {"country" : "Oman" , "currency_code" : "OMR"},
        {"country" : "Pakistan" , "currency_code" : "PKR"},
        {"country" : "Palau" , "currency_code" : "USD"},
        {"country" : "Panama" , "currency_code" : "PAB"},
        {"country" : "Papua New Guinea" , "currency_code" : "PGK"},
        {"country" : "Paraguay" , "currency_code" : "PYG"},
        {"country" : "Peru" , "currency_code" : "PEN"},
        {"country" : "Philippines" , "currency_code" : "PHP"},
        {"country" : "Pitcairn Island" , "currency_code" : "NZD"},
        {"country" : "Poland" , "currency_code" : "PLN"},
        {"country" : "Polynesia (French) ", "currency_code" : "XPF"},
        {"country" : "Portugal" , "currency_code" : "EUR"},
        {"country" : "Puerto Rico" , "currency_code" : "USD"},
        {"country" : "Qatar" , "currency_code" : "QAR"},
        {"country" : "Reunion (French) ", "currency_code" : "EUR"},
        {"country" : "Romania" , "currency_code" : "RON"},
        {"country" : "Russia" , "currency_code" : "RUB"},
        {"country" : "Rwanda" , "currency_code" : "RWF"},
        {"country" : "Saint Helena" ,"currency_code" : "SHP"},
        {"country" : "Saint Kitts and Nevis Anguilla" ,"currency_code" : "XCD"},
        {"country" : "Saint Lucia" ,"currency_code" : "XCD"},
        {"country" : "Saint Pierre and Miquelon", "currency_code" : "EUR"},
        {"country" : "Saint Vincent and the Grenadines" ,"currency_code" : "XCD"},
        {"country" : "Samoa" ,"currency_code" : "WST"},
        {"country" : "San Marino" , "currency_code" : "EUR"},
        {"country" : "Sao Tome and Principe", "currency_code" : "STD"},
        {"country" : "Saudi Arabia" , "currency_code" : "SAR"},
        {"country" : "Senegal" , "currency_code" : "XOF"},
        {"country" : "Serbia" , "currency_code" : "RSD"},
        {"country" : "Seychelles" , "currency_code" : "SCR"},
        {"country" : "Sierra Leone" , "currency_code" : "SLL"},
        {"country" : "Singapore" , "currency_code" : "SGD"},
        {"country" : "Slovakia" , "currency_code" : "EUR"},
        {"country" : "Slovenia" , "currency_code" : "EUR"},
        {"country" : "Solomon Islands" , "currency_code" : "SBD"},
        {"country" : "Somalia" , "currency_code" : "SOS"},
        {"country" : "South Africa" , "currency_code" : "ZAR"},
        {"country" : "South Korea" , "currency_code" : "KRW"},
        {"country" : "South Sudan" , "currency_code" : "SSP"},
        {"country" : "Spain" , "currency_code" : "EUR"},
        {"country" : "Sri Lanka" , "currency_code" : "LKR"},
        {"country" : "Sudan" , "currency_code" : "SDG"},
        {"country" : "Suriname" , "currency_code" : "SRD"},
        {"country" : "Svalbard and Jan Mayen Islands" ,"currency_code" : "NOK"},
        {"country" : "Swaziland" , "currency_code" : "SZL"},
        {"country" : "Sweden" , "currency_code" : "SEK"},
        {"country" : "Switzerland" , "currency_code" : "CHF"},
        {"country" : "Syria" , "currency_code" : "SYP"},
        {"country" : "Taiwan" , "currency_code" : "TWD"},
        {"country" : "Tajikistan" , "currency_code" : "TJS"},
        {"country" : "Tanzania" , "currency_code" : "TZS"},
        {"country" : "Thailand" , "currency_code" : "THB"},
        {"country" : "Togo" , "currency_code" : "XOF"},
        {"country" : "Tokelau" , "currency_code" : "NZD"},
        {"country" : "Tonga", "currency_code" : "TOP"},
        {"country" : "Trinidad and Tobago" , "currency_code" : "TTD"},
        {"country" : "Tunisia" , "currency_code" : "TND"},
        {"country" : "Turkey" , "currency_code" : "TRY"},
        {"country" : "Turkmenistan" , "currency_code" : "TMT"},
        {"country" : "Turks and Caicos Island", "currency_code" : "USD"},
        {"country" : "Tuvalu" , "currency_code" : "AUD"},
        {"country" : "U.K. ", "currency_code" : "GBP"},
        {"country" : "Uganda" , "currency_code" : "UGX"},
        {"country" : "Ukraine" , "currency_code" : "UAH"},
        {"country" : "United Arab Emirates" , "currency_code" : "AED"},
        {"country" : "Uruguay" ,"currency_code" : "UYU"},
        {"country" : "USA" ,"currency_code" : "USD"},
        {"country" : "USA Minor Outlying Islands" ,"currency_code" : "USD"},
        {"country" : "Uzbekistan" ,"currency_code" : "UZS"},
        {"country" : "Vanuatu" , "currency_code" : "VUV"},
        {"country" : "Vatican" , "currency_code" : "EUR"},
        {"country" : "Venezuela" , "currency_code" : "VEF"},
        {"country" : "Vietnam" , "currency_code" : "VND"},
        {"country" : "Virgin Islands (British) ", "currency_code" : "USD"},
        {"country" : "Virgin Islands (USA) ", "currency_code" : "USD"},
        {"country" : "Wallis and Futuna Islands" , "currency_code" : "XPF"},
        {"country" : "Western Sahara" , "currency_code" : "MAD"},
        {"country" : "Yemen" , "currency_code" : "YER"},
        {"country" : "Zambia" , "currency_code" : "ZMW"},
        {"country" : "Zimbabwe" , "currency_code" : "ZWD" }
        
  ]

  const handleBlur = () => {
    console.log('[blur]');
  };
  const handleChange = change => {
    console.log('[change]', change);
  };
  const handleClick = () => {
    console.log('[click]');
  };
  const handleFocus = () => {
    console.log('[focus]');
  };
  const handleReady = () => {
    console.log('[ready]');
  };

  let range = (start,end) => {
    let list = [];

    for(let i=start; i<=end; i++)
        list.push(i);

    return list;    
  };
  
  const createOptions = (fontSize) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, Menlo, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };
  class PaySuccess extends Component {
      
      render(){
        
          return(
      <div className="container-fluid">
      <div className="row">
      <div className="align-success">
      <svg id="createdAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
      <path id="createdAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
      <circle id="createdAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
      <polyline id="createdAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
      </svg></div>
  
  
        <h1 className="grey move-center">Coin added Successfully!</h1>
       
      </div>
      
    </div>
          );
      }
  }
  class _CardForm extends Component {
    
    constructor(props){
      super(props)
      /*this.state = {
        stripeToken: '',
      }*/
      this.state = this.props.getStore();
    }
    
    stripeCharge(){
        const { step, currencyUser, stripeToken, coinNumber, coinPrice, userid, fetching, created } = this.state;
        let coin = coinNumber;
        let amount = coinPrice*100;
        let token = stripeToken;
        let currency = currencyUser;
        let email = "paulj@gmail.com"
        //send token to stripe for charge
        console.log(currencyUser, stripeToken, coinNumber, coinPrice, userid);
        fetch(settings.urls.stripe_pay.replace('{user_id}', userid), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({coin, amount, token, currency, email})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                this.setState({fetching: false, created: true});
                this.paidSuccess()
                
            })
            .catch(error=>{ console.log(error.message)/*this.setState({fetching: false, error: error.message});*/});
    }
    
  
    paidSuccess(){
        
        return <PaySuccess />
    }


    onStripe(e) {
        if(e.error){
           console.log(e.error.message);
           return;  
        }

        this.setState({stripeToken:e.token.id});
        this.props.updateStore({stripeToken:e.token.id});

        //call stripe submit
        this.stripeCharge(); 

        console.log('submitted');
         
        //this.refs.body.className = "modal-body body-get-started is-showing animate-out";

        //TODO add success/fail handler, prevent moving to next stage if payment wasnt stripped succesfully 
        setTimeout(()=>this.props.onNext(), 600);
    }


    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
          this.props.stripe
              .createToken()
              .then(payload => this.onStripe(payload)); //set token state with token id
            //stripeCharge(token, user_id)
        } else {
          console.log('Form submitted before Stripe.js loaded.');
        }
    };

 
    render() {
        const { stripeToken } = this.state;

        return (
        <form onSubmit={this.handleSubmit}>
            <br/>
            <CardElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                className="StripeElement"
                {...createOptions(this.props.fontSize)}
            />
            <button className="navbar-btn aligner" >Pay</button>
        </form>
        );
    }
}
const CardForm = injectStripe(_CardForm);

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.getStore();
    }
    /*componentDidMount(){
        this.fetchUserProfile
        .then(search(data.applicantCountry, countryCurrency));
    }*/
    /*search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].country === nameKey) {
                this.setState({finalCurrency: myArray[i].currency_code})
                return myArray[i].currency_code;
            }
        }
        
    }*/
    
    /*fetchUserProfile(token, user_id) {
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
                data => this.setState({isloading: false, user: data.applicantCountry})
                //search(data.applicantCountry, countryCurrency);
            )
        }
    }*/
    clickNext() {
        this.refs.body.className = "modal-body body-get-started is-showing animate-out";
        setTimeout(()=>this.props.onNext(), 500);
    }
    onOneCoin(coin,price) {
        this.setState({coinPrice: price, coinNumber: coin});
        this.props.updateStore({coinPrice: price, coinNumber: coin});
        this.refs.body.className = "modal-body body-get-started is-showing animate-out";
        setTimeout(()=>this.props.onNext(), 500);
    }

    onTwoCoin(coin,price) {
        this.setState({coinPrice: price, coinNumber: coin});
        this.props.updateStore({coinPrice: price, coinNumber: coin});
        this.refs.body.className = "modal-body body-get-started is-showing animate-out";
        setTimeout(()=>this.props.onNext(), 500);
    }

    onThreeCoin(coin,price) {
        this.setState({coinPrice: price, coinNumber: coin});
        this.props.updateStore({coinPrice: price, coinNumber: coin});
        this.refs.body.className = "modal-body body-get-started is-showing animate-out";
        setTimeout(()=>this.props.onNext(), 500);
    }
    render () {
        //const {finalCurrency} = this.state
        return (
            <div ref="body" className="pricing-table">
    <ul className="pricing-cards monthly-pricing-cards clearfix">
        <li className="col-xs-12 col-md-4 pricing-card basic">
          <div className="pricing-card-inner pricing-match-height">
            <h3>$1.99</h3>
            <span className="monthly">
              <p className="pricing-number">1</p>
              <h4>coin</h4>
              <button className="navbar-btn aligner" onClick={()=>this.onOneCoin(1, 1.99)}>Buy Coin</button>
            </span>
            
          </div>
        </li>
        <li className="col-xs-12 col-md-4 pricing-card professional">
          <div className="pricing-card-inner pricing-match-height">
            <h3>$3.00</h3>
            <span className="monthly">
              <p className="pricing-number">2</p>
              <h4>coins</h4>
              <button className="navbar-btn aligner" onClick={()=>this.onTwoCoin(2, 3)}>Buy Coin</button>
            </span>
            
          </div>
        </li>
        <li className="col-xs-12 col-md-4 pricing-card high-volume">
          <div className="pricing-card-inner pricing-match-height">
            <h3>$5.99</h3>
            <span className="monthly">
              <p className="pricing-number">3</p>
              <h4>coins</h4>
              <button className="navbar-btn aligner" onClick={()=>this.onOneCoin(3, 5.99)}>Buy Coin</button>
            </span>
            
          </div>
        </li>
    </ul>
    </div>
        );
    }
}



class Step2 extends Component {

    constructor(props) {
        super(props);

        /*this.state = {
          elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
          paymentID: '',
        };*/
        this.state = this.props.getStore();

        window.addEventListener('resize', () => {
          if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
            this.setState({elementFontSize: '14px'});
          } else if (
            window.innerWidth >= 450 &&
            this.state.elementFontSize !== '18px'
          ) {
            this.setState({elementFontSize: '18px'});
          }
        });
    }


    componentDidMount() {}

    
    clickNext = () => {
        setTimeout(()=>this.props.onNext(), 600);
    }


    verifyPaypal = () => {
        const {elementFontSize, paymentID, coinPrice, coinNumber, currencyUser, userid} = this.state;
        //send payment id to services paypal endpoint
        return fetch(settings.urls.paypal_pay.replace('{user_id}', userid), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            body: JSON.stringify({paymentID: paymentID, coin: coinNumber})
        })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw Error(json.error.message || 'Unknown fetch error');
                //this.setState({fetching: false, error: undefined, created: true});
                this.clickNext();
            })
            //.catch(error=>{ this.setState({fetching: false, error: error.message});});
    }

 
    render () {
        const {elementFontSize, paymentID, coinPrice, coinNumber, currencyUser} = this.state;

        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            this.setState({paymentID: payment.paymentID});
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
            //verify paypal here
            this.verifyPaypal()
        }		
		
		const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            
			console.log('The payment was cancelled!', data);
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}	
		
		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
			console.log("Error!", err);
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
		}			
		let shipping = 1;	
		let env = 'sandbox'; // you can set here to 'production' for production
		let currency = currencyUser; // or you can set this value from your props or state  
		let total = coinPrice*100; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
		let style = {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        }

		const client = {
			sandbox:    config.security.sandbox,
			production: 'YOUR-PRODUCTION-APP-ID',
		}

        return (
            <div ref="body" className="pricing-table">
            <ul className="pricing-cards monthly-pricing-cards clearfix">
                <li className="col-xs-12 col-md-6 pricing-card professional">
                <div className="pricing-card-inner pricing-match-height">
                    <span className="monthly">
                    <p className="pricing-number">Stripe </p>
                    <StripeProvider apiKey="pk_test_WwdF2h2PYwDQCIJikhCAeBDx">
                        <div className="Checkout">
                            <Elements>
                            <CardForm onNext={this.props.onNext} getStore={() => ({...this.state})} updateStore={(u) => (this.setState(u))} fontSize={elementFontSize} stripe="pk_test_WwdF2h2PYwDQCIJikhCAeBDx" />
                            </Elements>
                        </div>
                    </StripeProvider>
                    </span>
                    
                </div>
                </li>
                <li className="col-xs-12 col-md-6 pricing-card high-volume">
                <div className="pricing-card-inner pricing-match-height">
                    <span className="monthly">
                    <p className="pricing-number">PayPal</p>
                    <br/>
                    
                    <PaypalExpressBtn 
                        env={env} style={style} client={client} shipping={shipping} currency={currency} 
                        total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} 
                    />
                    </span>
                    <br/>
                </div>
                </li>
            </ul>
            </div>
        );
    }
}



class Step3 extends Component {
    clickNext() {
        const query = parse(location.search);
        if (query.search_callback == "true"){
        this.props.onNext();
        }
        return
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.onNext();
        }, 3000)
    }
    
    render () {
        const query = parse(location.search);
        return (
            <div className="row coin_succeess">
            <div className="col-md-4">
            </div>
            <div className="col-md-4 col-sm-12">
                <div className="col-spaced box">
                <div className="align-success">
            <svg id="createdAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
            <path id="createdAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
            <circle id="createdAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id="createdAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
            </svg></div>
                    <p className="success_text">Payment Success!</p>
                    {
                        query.search_callback == "true" ?
                        <p className="success_text">You will be redirected soon</p>
                        : null
                    }
                </div>
            </div>
            <div className="col-md-4">
            </div>
            </div>
        );
    }
}



class StepsHeader extends Component{

    render () {
        const {step, total_steps} = this.props;
        /*
        const steps = new Array(total_steps)
                        .fill('')
                        .map(function (val, index) {
                            if ((index+1) == step) return 'active';
                            if ((index+1) < step) return 'is-done';
                            return '';
                        });
        */

        return (
            this.props.total_steps<=0 ? null :
            <div className="row">
                <section className="five-simple-steps _6">
                    <div className="row centered">
                        <div className="col-xs-12">
                            <br/><br/><br/>
                            <ul className="steps-nav">
                                <div className="line"></div>
                                {
                                    range(1,this.props.total_steps)
                                    .map((s) => 
                                        <li key={`step-${s}`} className={step===s ? "steps active" : "steps"}>
                                            <a className="buy_coin_a" href="#" data-scroll="false">
                                                <h2>{s}</h2>
                                                <p>Step {s}</p>
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}



export class BuyCoin extends Component {

    constructor(props) {
        super();
        this.state = {
            step: 1,
            open: false,
            fetching: false,
            created: false,
            showCloseIcon: false,
            currencyUser: 'USD',
            finalCurrency: '',
            symbol: '',
            coinNumber: 0,
            coinPrice: 0,
            stripeToken: '',
            elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
            paymentID: '',
            userid: 0,
        };
    }


    componentWillMount(){
        this.onOpenModal()
    }

    redirectFunc(){
        const query = parse(location.search);
        console.log(query);
        console.log(query.search_callback);
        console.log(query.criteria);
        console.log(query.level);
        console.log(query.gpa);
        //bug starts here
        if (query.search_callback == "true"){
            console.log("works here")
            //return <Redirect to='/'/>
            this.props.history.push(`/scholarship-search?search_callback=true&criteria=${query.criteria}&level=${query.level}&amount=${amount}&gpa=${query.gpa}&applicant_country=${query.applicant_country}&country=${query.country}&major=${query.major}&offset=${query.offset}`);
        }
        return
      }
    
    setUser(token,user){
        this.setState({userid: user})
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    

    onCloseModal = () => {
        this.setState({ open: false });
    };


    setCurrency = () => {
        console.log(this.state.currencyUser);
        //sessionStorage.setItem('myCurrency', this.state.currencyUser);
        this.setUser(localStorage.token, this.props.user_id);
        this.onCloseModal();
    };

     
    throwAwayModal = () => {
        this.refs.wrapper.className = "modal-wrap animate-up";
        setTimeout(this.setStep(4), 600); //next step - show nothing
    };


    getStore = () => ({...this.state});
    

    updateStore = (update) => this.setState(update);
    
    
    render() {
        const {step, open, showCloseIcon, currencyUser} = this.state;
        console.log('buy-coin', this.props.user_id)

        if (step>3) return null; // show nothing 

        return (
            <div ref="wrapper" className="buy_coin">
                <Section1 title=""/>
                <StepsHeader step={step} total_steps={3}/>
                <div className="modal-bodies">
                    {
                        step===1 && 
                        <Step1 
                            onNext={() => this.setState({step: 2})} 
                            getStore={() => this.getStore()} 
                            updateStore={(u) => this.updateStore(u)}
                        />
                    }
                    {
                        step===2 && 
                        <Step2 
                            onNext={() => this.setState({step: 3})} 
                            getStore={() => this.getStore()} 
                            updateStore={(u) => this.updateStore(u)}
                        />
                    }
                    {
                        step===3 && <Step3 onNext={() => this.redirectFunc()}/>
                    } 
                </div>
                <Footer />
                <Modal className="country-modal" open={open} onClose={this.onCloseModal} showCloseIcon={showCloseIcon} little>
                    
                    <div className="country-wrapper">
                    <p>Set your currency</p>
                    
                    <select className="country-dropdown" onChange={e=>this.setState({currencyUser: e.target.value})}>
                    <option value="default">Pick Country</option>
                    { countryCurrency.map((stuff, i) => <option key={i} value={stuff.currency_code}>{stuff.country}</option>) }
                    </select>
                    <br/>
                    <button className="navbar-btn aligner move-down" onClick={()=>this.setCurrency()}>Next</button>
                    
                    </div>
                </Modal>
            </div> 
       );
    }
}

function mapper(state) {
    console.log('state', state)
    return {
        user_id: state.user.data && state.user.data.id
    }
}

export default connect(mapper)(BuyCoin);