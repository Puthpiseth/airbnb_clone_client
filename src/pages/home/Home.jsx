import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import '../../assets/styleSheets/Home.scss';
import home from '../../assets/images/home.jpg';
import PlacesWrapper from '../../utils/componentsUtils/PlacesWrapper';
import SignComponent from '../../utils/componentsUtils/SignComponent';
import { AppContext } from '../../utils/context/appContext';
import { getLastPlaces } from '../../utils/services/utilsRequestFunctions';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Home(props) {

    const [placesArr, setPlaceArr] = useState([]);
    const [searchResult, setResult] = useState([]);
    const context = useContext(AppContext);
    
    useEffect(()=>{
         const fetch = async() =>{
            const lastPlaces = await getLastPlaces();
            setPlaceArr( arr => [...lastPlaces]);
        }
        fetch();
    },[])

    useEffect(()=>{
        setResult( result => [...context.cityResultFetch] );
    }, [context.cityResultFetch])
    
    return (
        <div className ="home-main-wrapper" style = { context.homePageState }>
            <Header/>
            <SignComponent/>
            <PlacesWrapper history = {props.history} places = { searchResult} img={home}>
                <LocationOnIcon/>

            </PlacesWrapper>

            <PlacesWrapper history = {props.history} places = { placesArr }img={home}>
            </PlacesWrapper>
            <div className="copyright_section">
                <p>&#169;2021 Airbnb Clone No right Reserved</p>
            </div>
        </div>
    )
}

export default Home;

