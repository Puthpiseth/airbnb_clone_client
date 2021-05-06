import React from 'react';
import AirbnbIcon from '../../assets/images/airbnb.svg';
import '../../assets/styleSheets/NavBar.scss';


function NavBar() {
    return ( 
        <div className="navbar">
            <img className="airbnb-icon" src={AirbnbIcon}/>
            <button>Créer une annonce</button>
        </div>
    )
}

export default NavBar;