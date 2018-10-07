import React, {Component} from 'react'
//import {connect} from 'react-redux';
import settings from '../../settings'
import {Search, DollarSign, Calendar, Edit} from 'react-feather'

export default class NoResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render(){
        return <div>
            <div className="row">
                <section className="search-result-section-2">
                    <div className="story-box">
                        <div className="row">
                        <div className="col-md-1">
                        </div>

                                    
                                    <div className="col-md-10 col-sm-12">
                                    <div className="col-spaced box">
                                   <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                        <div className="aligner"><h3>No Results Found!</h3></div>
                                        </div>
                                        <div className="col-md-3">
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
            </div> 
        
    }
}
