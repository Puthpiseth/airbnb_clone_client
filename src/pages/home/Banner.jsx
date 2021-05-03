import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import '../../assets/styleSheets/Banner.scss';

function Banner() {
    return (
        <div className="banner">
            <h1>En pleine nature</h1>
            <p>Favoris sélectionner par Airbnb</p>            
            <Button className="banner_button">Explorer</Button>
        </div>
    )
}

export default Banner
