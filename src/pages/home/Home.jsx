import React from 'react';
import Header from './Header';
import Card from '../../utils/componentsUtils/Card'
import '../../assets/styleSheets/Card.scss';
import home from '../../assets/images/home.jpg';

function Home() {
    return (
        <div>
            <Header/>
                <div className="home_section">
                    <Card
                        img={home}
                        name="Logement entier"
                        description="Studio Saint-Germain des Près"
                    />
                </div>
                <div className="copyright_section">
                    <p>&#169;2021 Airbnb Clone No right Reserved</p>

                </div>
                
              
        </div>
    )
}

export default Home

