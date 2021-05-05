import React from 'react';
import Header from './Header';
import '../../assets/styleSheets/Home.scss';
import home from '../../assets/images/home.jpg';
import PlacesWrapper from '../../utils/componentsUtils/PlacesWrapper';
import SignComponent from '../../utils/componentsUtils/SignComponent';

function Home() {
    return (
        <div className ="home-main-wrapper">
            <Header/>
            <SignComponent/>
            <PlacesWrapper img={home} name="Logement entier"  description="Studio Saint-Germain des Près"/>
            <div className="copyright_section">
                                        <p>&#169;2021 Airbnb Clone No right Reserved</p>
            </div>
        </div>
    )
}

export default Home;

