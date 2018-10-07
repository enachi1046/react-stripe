import React, {Component} from 'react'
import { render } from "react-dom";
import Navbar from './shared/navbar'
import {Play} from 'react-feather'
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Plyr from 'react-plyr';

export class Home extends Component {
    //svg background color #FFB770
    constructor(props) {
        super(props)
        this.state = {
          open: false,
          showCloseIcon: false,
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
      }
    
    
      onOpenModal() {
        this.setState({ open: true });
      };
    
      onCloseModal() {
        this.setState({ open: false });
      };
          render () {
        const { open, showCloseIcon } = this.state;
        return (
            <div className="container-fluid">
            <div className="row">
            <section className="section1">
                     <Navbar />  
                    
                    <div className="row-fluid hero-box">
                        <div className="col-md-6">
                            <div className="headline-box">
                            <h1 className="home-headline">Welcome to The Academist </h1>
                            <p className="home-text">Where Education Transcends Borders</p>
                            <p className="home-text-paragraph">A reliable host where students are empowered with adequate information that helps shape their academic careers outstandingly.</p>
                            <div className="row">
                            <div className="col-md-6">
                            <div className="col-spacer">
                            <input type="submit" className="home-button" value="Get Started" />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="col-spacer-2">
                            <button className="home-button-2 aligner" onClick={this.onOpenModal} ><Play className="user-icon" /> <span className="learn-more-text">Learn More</span></button>
                            <Modal className="video-modal" open={open} onClose={this.onCloseModal} showCloseIcon={showCloseIcon} little>
                            <Plyr
                                type="video"
                                autoplay
                                url="https://www.theacademist.com/wp-content/uploads/2018/02/videoplayback.mp4"
                                onEnd={this.onCloseModal}
                                />
                            </Modal>
                            </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">

                            </div>
                        </div>
                    
                </section>
                <svg className="curve-down" id="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <style type="text/css">
                  { `.st0{fill:#f6f9fc;}`}
                   { `.st1{background: url(./img/curve_down_background.JPG);
    background-repeat: no-repeat;
    background-size: auto;}`}
                  </style>
                  <defs>
        <pattern id="img1" patternUnits="userSpaceOnUse" width="53" height="15">
            <image className='twombly' xlinkHref="./img/curve_down_background.JPG" x="0" y="0"
                width="53" height="15" />
        </pattern>

    </defs>
                  
                  <g>
                          <rect id="path-1" x="0.1" className="st0" width="380.9" height="52" />
                      </g>
                  <path width="380.9" height="52" fill="url(#img1)" d="M0 0 C 50 100 80 100 100 0 Z"/>
              </svg>

                </div>
                <div className="row">
                <section className="section2">
                <div className="story-box">
                <div className="row">
                              <div className="col-md-4 col-sm-12">
                              <div className="col-spaced box">
                                    <img src="./img/edu.png" className="hero-img" />
                                    <p className="story-paragraph">Personalize your evaluated GPA to search for schools you might qaspiring to study thereualify for and the opportunities abound. Search schools based on your GPA</p>
                                   
                                   </div></div>
                              <div className="col-md-4 col-sm-12"><div className="col-spaced box">
                                    <img src="./img/computer.png" className="hero-img" />
                                    <p className="story-paragraph">Over 3,000 scholarships are made available specifically for international students. Find out which you qualify for!!!</p>
                                    
                              </div></div>
                              <div className="col-md-4 col-sm-12"><div className="col-spaced box">
                                    <img src="./img/gpa.png" className="hero-img" />
                                    <p className="story-paragraph">As an aspiring undergraduate/graduate student, evaluate your GPA to the US and Canada grade system; and it’s eligibility to your school of interest.</p>
                                   
                              </div></div>
                        </div>
                        </div>
                </section>
                </div>
                
            </div>
        );
    }
}