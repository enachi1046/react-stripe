import React, {Component} from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import config from '../config'

export class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.state = {
          paymentID: '',
        };
      }

      /*submitNow(token){
        return fetch(settings.urls.paypal, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.token},
            mode: 'cors',
            body: JSON.stringify({paymentid, date})
        })
            .then(response=>response.json())
    }*/

    render () {
        const { paymentID } = this.state;
        //implement fetch to send payment id to server with time to know if payment is paid and then add coin
        
        const onSuccess = (payment) => {
			// Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		}		
		
		const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            this.setState({paymentID: data.paymentID});
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
		let currency = 'USD'; // or you can set this value from your props or state  
		let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
		let style = {
            size: 'large',
            color: 'gold',
            shape: 'pill',
        }

		const client = {
			sandbox:  config.security.sandbox ,
			production: 'YOUR-PRODUCTION-APP-ID',
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		
		
		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        return (
            <div>
            <h3>Payment ID: {paymentID}</h3>
            <PaypalExpressBtn env={env} style={style} client={client} shipping={shipping} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            </div>
        );
    }
}