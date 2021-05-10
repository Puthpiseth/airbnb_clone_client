import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import Card from './Card';
import '../../assets/styleSheets/PlacesWrapper.scss';

function PlacesWrapper(props) {
    
    const handleShowDetails = (e) =>{
        const id = e.currentTarget.getAttribute('data');
        props.history.push(`/details/${id}`);
    }

    return (
        <div className="places-wrapper">
            {props.places.map((el, i) =>{
                return <Card key ={i+1} data = {el.id} img = {props.img} description = {el.description} name = {el.name}  handleClick = { handleShowDetails }/>
            })}
        </div>
    );
}

export default PlacesWrapper;