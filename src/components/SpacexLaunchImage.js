import { Component } from 'react';
import './spacex-image.css'
import image from '../assets/img/launch-home@3x.png'

export class SpacexLaunchImage extends Component {
    render(){
        return (
            <>
            <div className="launch_image">
                <img className="spacex_image" src={image} alt={''}/>
            </div>
            </>
        )
    }
}