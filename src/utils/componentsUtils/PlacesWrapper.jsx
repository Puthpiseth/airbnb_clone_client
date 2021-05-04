import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import Card from './Card';
import '../../assets/styleSheets/PlacesWrapper.scss';



function PlacesWrapper(props) {
    


    return (
        <div className="places-wrapper">
            
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />
            <Card img = {props.img} description = {props.description} name = {props.name} />

            
        </div>
    );
}

export default PlacesWrapper;