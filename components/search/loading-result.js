import React, {Component} from 'react'
//import {connect} from 'react-redux';
import settings from '../../settings'
import {Search, DollarSign, Calendar, Edit} from 'react-feather'

export default class LoadingResult extends Component{

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
                                        <div className="col-md-5">
                                        <h3 className="word-wrap"><div className='text-input__loading--line'></div></h3>
                                        </div>
                                        <div className="col-md-3">
                                        <div className="aligner">
                                        <span className="search-info"><div className='text-input__loading--line'></div></span></div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="aligner">
                                        <span className="search-info"><h3><div className='text-input__loading--line'></div></h3></span></div>
                                        </div>
                                    </div>
                                    
                                    <div className="row search-push-down">
                                        <div className="col-md-2">
                                        <h4><div className='text-input__loading--line'></div></h4>
                                        </div>
                                        <div className="col-md-2">
                                        <h4><div className='text-input__loading--line'></div></h4>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-3">
                                        <div className='text-input__loading--line'></div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className='text-input__loading--line'></div> 
                                        </div>
                                    </div>
                                    <div className="row search-push-down">
                                        <div className="col-md-2">
                                        <h4><div className='text-input__loading--line'></div></h4>
                                        </div>
                                        <div className="col-md-2">
                                        <h4><div className='text-input__loading--line'></div></h4>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-3">
                                        <div className='text-input__loading--line'></div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className='text-input__loading--line'></div> 
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
