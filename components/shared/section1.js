import React, {Component} from 'react'
import Navbar from './navbar'
export default class Section1 extends Component{
    constructor(props){
        super(props)
    }
    render(){
        
        return(
            <div className="row">
            <section className="profile-section">
                     <Navbar />  
                    
                    <div className="row-fluid hero-box">
                        <div className="col-md-12">
                            <div className="headline-box">
                            <h1 className="home-headline">{this.props.title} </h1>
                             
                            </div>
                        </div>
                        <div className="col-md-6">

                            </div>
                        </div>
                    
                </section>
                
                </div>
        );
    }
}