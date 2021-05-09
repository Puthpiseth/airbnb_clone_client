import { useState, useEffect, useContext } from 'react';
import '../../assets/styleSheets/details.scss';
import { getInfo } from '../../utils/services/utilsRequestFunctions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {AuthCtx} from '../../utils/context/AuthContext';
import {book_a_place} from '../../utils/services/tourist';

function Details(props){
    const [info, setInfo] = useState({});
    const id = props.match.params.id;
    const [startDate, setStart] = useState();
    const [endDate, setEnd ] = useState();
    const ctx = useContext(AuthCtx);
    const [actionButtonDisplay, setDisplay] = useState("none");
    const [authorization , setAuthorization] = useState('');

    let time = null;
    let role = '';
    let token = '';

    if(localStorage.getItem('auth')){
        role = JSON.parse(localStorage.getItem('auth')).role;
        token = JSON.parse(localStorage.getItem('auth')).token
    }

    useEffect(()=>{

        const func = async()=>{
            const response = await getInfo(id);
            await setInfo( infos => ({...response}));
        }
        func();
        
    },[info])


    useEffect(()=>{
        if(role === "touriste" || role === "hote")
                setDisplay(display => "block");
        else{
            setDisplay(dislay => "none");
        }
            
    },[ctx.isAuth])


    useEffect(()=>{
        if(info.available)
            time = window.setTimeout(()=>manageDateFormat(info.available),0);
        return ()=> {
            window.clearTimeout(time);
        }
    },[info])

    const handleClick = async() => {
        
        if(role === 'hote'){
            props.history.push(`${props.match.url}/modifier`)
        }
        //si l'utilisateur est un touriste il ne peut que réserve depuis la page détail
        else{

            const place = {
                token : token,
                place_id : props.match.params.id,
                check_in : startDate,
                check_out : endDate
            }
            const response = await book_a_place(place);
            console.log(response);
        }
    }

    const manageDateFormat = (date)=>{
        const dateArr = date.split('/');
        const first = new Date(dateArr[0]).getTime();
        const second = new Date(dateArr[1]).getTime();
        if( first >= second) {
            setStart(date => new Date(second).toDateString());
            setEnd (date =>  new Date(first).toDateString());
        }
        else{
            setStart(date => first);
            setEnd (date => second);
        }
    }

    return(
        <div className = "details-main-wrapper">
            <h1>
                {info.name} - {info.description}
                <br/>
                <span>
                    <LocationOnIcon className = "location-icon"/>
                    {info.city}
                </span>
            </h1>
            
            <div className = "img-wrapper">

            </div>
            <div className='place-info-plus-avatar'>
                <div>
                    <h2>Hote : {info.first_name}</h2>
                    <p>{info.max_guests} voyageurs• {info.rooms}lit(s)• {info.bathrooms} salles de bains</p>
                </div>
                <img src="" alt="" />
            </div>
            
            <div className = "info-card">
                <h3 className="info-price">
                    {info.price_by_night}<span> € / nuits</span>
                </h3>  
                <div className = "date-section">
                    <h4>
                        Arrivée
                        <br/>
                        { startDate }
                    </h4>
                    <h4>
                        Départ
                        <br/>
                        { endDate }
                    </h4>
                </div>
                <button onClick = { handleClick }style = {{ display : actionButtonDisplay }} className = "book-a-place">{ role === "hote" ? "Modifier" : "Réserver"}</button>
            </div>
            

        </div>
    )
}

export default Details;