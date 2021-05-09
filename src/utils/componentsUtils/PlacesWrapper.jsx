import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import Card from './Card';
import '../../assets/styleSheets/PlacesWrapper.scss';

function PlacesWrapper(props) {
    
    const handleShowDetails = (e) =>{
        console.log("coucou")
        const id = e.currentTarget.getAttribute('data');
        props.history.push(`/details/${id}`);
    }
    return (
        <div className="places-wrapper">
            <h2>{props.children}</h2> 
            {props.places.map((el, i) =>{
                return(
                    <Card key ={i} data = {el.id} img = {props.img} description = {el.description} name = {el.name}  handleClick = { handleShowDetails }/>
                )
            } )}
        </div>
    );
}

export default PlacesWrapper;