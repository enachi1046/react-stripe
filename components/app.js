import React, {Component} from 'react'
import Footer from './shared/footer'

export class App extends Component {
    render () {
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
            
        );
    }
}