import { Component } from 'react';
import './spacex-header.css'
import logo from '../assets/spacex-logo.png'

export class SpacexLogo extends Component {
    render(){
        return (
            <>
            <div className="header">
                <img className="spacex_logo" src={logo} alt={"logo"}/>
                <h1>Launches</h1>
            </div>
            </>
        )
    }
}