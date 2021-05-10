import React,{ useState, useEffect } from 'react';
import PlacesWrapper from '../../utils/componentsUtils/PlacesWrapper';
import {places_booked_list }from '../../utils/services/tourist';
import '../../assets/styleSheets/Touriste.scss';
import airbnbIcon from '../../assets/images/airbnb.svg';
import home from '../../assets/images/home.jpg';

function Touriste(props){

    const [bookedItems, setItems] = useState([]); 

    const token= JSON.parse(localStorage.getItem('auth')).token;

    useEffect(()=>{
        const func = async ()=>{
            console.log(token)

            const items = await places_booked_list(token);
            setItems(item => items.data.response);
            console.log(bookedItems);
        }
        func();
    },[bookedItems])
    
    return(

        <div className = 'touriste-option-manager'>
            <div className = "upper-logo-block">
                <img src = {airbnbIcon}/>
            </div>
            <div className = "Reservation">
                <h2>Vos dernières réservations</h2>
                <PlacesWrapper history = {props.history} places = { bookedItems }img={home} />
            </div>
        </div>
    )
}

export default Touriste;