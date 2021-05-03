import React from 'react';
import '../../assets/styleSheets/Card.scss';
import StarIcon from '@material-ui/icons/Star';


function Card({img, name, description, price_by_night}) {
    return (
        <figure className="card">
            <img src={img} />
            <figcaption>
                
                <p>
                    <StarIcon className="star_icon"/>26 commentaires<br/>
                    {name}<br/>
                    {description}
                </p>               
            </figcaption>            
        </figure>
    )
}

export default Card
