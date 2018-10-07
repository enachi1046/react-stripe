import React, {Component} from 'react'

export default class Footer extends Component{
    render(){
        return(
            
  <div className="container-fluid footer-container">
    <div className="row footer-row">
      <div className="col-sm-2 first-section">
        <ul className="new-homepage-footer-links">
          <h4>Resources</h4>
          <li>
            <a href="/scholarship-search">Scholarships</a>
          </li>
          <li>
            <a href="/school-search">Schools By Major</a>
          </li>
          <li>
            <a href="/school-search/by-gpa">Schools by Gpa</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-2 second-section">
        <ul className="new-homepage-footer-links">
          <h4>Learn</h4>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="/forum">Forum</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="/blog">Blog</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-2 third-section">
        <ul className="new-homepage-footer-links">
          <h4>Company</h4>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <li>
            <a href="/careers">Careers</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
          <h4>Legal</h4>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-use">Terms of Use</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-3">
        <ul className="new-homepage-footer-links">
          <h4>Get in touch</h4>
          <li>We're here if you need us:</li>
          <li>
            <a href="/contact-us">Contact us</a>
          </li>
          <li className="social-icons">
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.facebook.com">
            <img src="/img/facebook_icon.svg" className="footerImg" width="32px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://twitter.com">
            <img src="/img/twitter_icon.svg" className="footerImg" width="32px"/>
            </a>&nbsp;
            <a target="_blank" rel="noopener noreferrer" className="social-icon" href="https://www.linkedin.com">
            <img src="/img/linked_in.svg" className="footerImg" width="32px"/>
            </a>
            
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12 new-homepage-footer-logo">
        
        <span>All rights reserved The Academist&trade; 2018</span>
      </div>
    </div>
  </div>
        );
    }
}