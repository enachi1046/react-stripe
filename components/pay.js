import React, {Component} from 'react'

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
export class UserForm extends Component{
    render(){
        return(
        <section>
          <h2>Shipping &amp; Billing Information</h2>
          <fieldset className="with-state">
            <label>
              <span>Name</span>
              <input name="name" className="field" placeholder="Jenny Rosen" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" className="field" placeholder="jenny@example.com" />
            </label>
            <label>
              <span>Address</span>
              <input name="address" className="field" placeholder="185 Berry Street Suite 550" />
            </label>
            <label>
              <span>City</span>
              <input name="city" className="field" placeholder="San Francisco" />
            </label>
            <label className="state">
              <span>State</span>
              <input name="state" className="field" placeholder="CA" />
            </label>
          </fieldset>
        </section>
        );
    }
}
class _CardForm extends Component {
    /*submitServer(e, token){
        e.preventDefault();
        //submit to token and user info to the server for charging card

    }*/
    constructor(props){
      super(props)
      this.state = {
        stripeToken: '',
      }
    }
    handleSubmit(ev){
        ev.preventDefault();
        if (this.props.stripe) {
          this.props.stripe
            .createToken()
            .then(payload => this.setState({ stripeToken: payload.token.id})); //set token state with token id
        } else {
          console.log('Form submitted before Stripe.js loaded.');
        }
      };
  render() {
     const { stripeToken } = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
          <h3>Stripe token: {stripeToken}</h3>
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            className="StripeElement"
            {...createOptions(this.props.fontSize)}
          />
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);


export class Pay extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
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

  render() {
    const {elementFontSize} = this.state;
    return (
        <StripeProvider apiKey="pk_test_WwdF2h2PYwDQCIJikhCAeBDx">
      <div className="Checkout">
        <h2>All-in-one Card Form</h2>
        
        <Elements>
          <CardForm fontSize={elementFontSize} stripe="pk_test_WwdF2h2PYwDQCIJikhCAeBDx" />
        </Elements>
       
      </div>
      </StripeProvider>
    );
  }
}