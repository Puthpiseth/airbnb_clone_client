import React from 'react';
import '../../assets/styleSheets/Card.scss';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Card(props) {
    return (
        <figure className="card" onClick = { props.handleClick } data= { props.data } >
            <FavoriteIcon className="fav-icon"/>
            <img src={props.img} alt="img"/>
            <figcaption>
                <p>
                    <StarIcon className="star_icon"/>26 commentaires<br/>
                    {props.name}<br/>
                    {props.description}
                </p>               
            </figcaption>            
        </figure>
    )
}

export default Card
