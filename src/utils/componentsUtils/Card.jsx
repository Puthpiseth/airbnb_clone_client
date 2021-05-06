import React from 'react';
import '../../assets/styleSheets/Card.scss';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Card({img, name, description, price_by_night}) {
    return (
        <figure className="card">
            <FavoriteIcon className="fav-icon"/>
            <img src={img} alt="img"/>
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
