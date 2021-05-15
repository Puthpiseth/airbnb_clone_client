import {useState,useEffect, useContext} from 'react';
import {useHistory} from 'react-router'
import '../../assets/styleSheets/FormComponent.scss';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Calendar} from 'react-date-range'
import {AppContext} from '../../utils/context/appContext';
import FormStepSwitcher from '../../utils/componentsUtils/FormStepSwitcher';
import { add_a_place } from '../../utils/services/host';
import { Description } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

function FormComponent(){

    
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [max_guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [price, setPrice] = useState(16);
    const [description, setDescription] = useState('');
    const [termsAccepted, setAccept] = useState(false);
    const [available, setAvailability] = useState('')
    const ctx = useContext(AppContext);
    
    const history = useHistory();

    const handleCity = (e)=> setCity(city => e.target.value );
    const handleName = (e)=> setName(name => e.target.value );
    const handleAddGuests = () => setGuests(guests => guests + 1);
    const handleRemoveGuests = () => setGuests(guests => guests > 1 ? guests - 1 : guests);
    const handleAddRooms = () => setRooms(rooms => rooms + 1);
    const handleRemoveRooms = () => setRooms(rooms => rooms > 1 ? rooms - 1 : rooms);
    const [date, setDate] = useState({startDate : new Date(), endDate : new Date()});
    const [state, setState] = useState(0);
    const [start, setStart] = useState(null);
    const [end , setEnd] = useState(null)

    useEffect(()=>{
        switch(ctx.step){
            case 1 : 
                ctx.addPlaceItem(city);
                break;
            case 2 : 
                ctx.addPlaceItem(name);
                break;
            case  3 :
                ctx.addPlaceItem(bathrooms);
                ctx.addPlaceItem(max_guests);
                ctx.addPlaceItem(rooms);
                break;
            default : return;
        }
        
    },[ctx.step]);

    useEffect(()=>{
        if( new Date(start).getTime() > new Date(end).getTime())
        setDate({startDate : end, endDate : start});
        
        else
        setDate({startDate : start, endDate :end});

    },[start, end]);

    const handleAddBathrooms = () => setBathrooms(bathrooms => bathrooms + 1);
    const handleRemoveBathRooms = () => setBathrooms(bathrooms => bathrooms > 1 ? bathrooms  - 1 : bathrooms );
    const checkIfTermsAccepted = (e) => setAccept(accept => e.target.checked?true : false);
    const handlePriceChanges = (e) => setPrice(price =>  e.target.value);
    const addDescription = (e) => setDescription(description => e.target.value);

    //select date
    const handleSelect = (e)=>{
        setState ( state => state >= 1 ? 0 : state + 1 );
        state > 0 ? setEnd(end => e) : setStart(start => e);
    }            

    const handleSubmit = async(e) => {

        e.preventDefault();
        if(termsAccepted){
            const place = {
                city_name : city, 
                name : name, 
                max_guests : Number(max_guests), 
                rooms : Number(rooms), 
                bathrooms : Number(bathrooms), 
                price_by_night : Number(price), 
                description : description,
                available : `${ start.toDateString()}/${ end.toDateString() }`
            }
            try{
                const response = await add_a_place(place);
                console.log(response)
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return(
        <form onSubmit = {handleSubmit} >
            <WhichOne max_guests = {max_guests} rooms = {rooms} bathrooms = {bathrooms} step = {ctx.step} cityCallback = {handleCity} nameCallback = {handleName} addGuestCallback = {handleAddGuests} removeGuestsCallback = {handleRemoveGuests}  addRoomsCallback = {handleAddRooms} removeRoomsCallback = {handleRemoveRooms} addBathroomsCallback = {handleAddBathrooms}  removeBathroomsCallback = {handleRemoveBathRooms} priceCallback = {handlePriceChanges} termsCallback = {checkIfTermsAccepted} addDescriptionCallback = {addDescription} selectDateCallback = { handleSelect } dateRange = {date}/>
            <FormStepSwitcher/>
        </form>
    )
}

function WhichOne(props){
    switch(props.step){
        case 0 : return <FirstStep name = {props.name} callback = {props.cityCallback} />
        case 1 : return <SecondStep callback = {props.nameCallback}/>
        case 2 : return <ThirdStep max_guests = {props.max_guests} rooms = {props.rooms} 
                            bathrooms = {props.bathrooms}
                            callbackAddGuest ={ props.addGuestCallback} 
                            callbackRemoveGuest = { props.removeGuestsCallback}
                            callbackAddRoom = {props.addRoomsCallback} 
                            callbackRemoveRoom = {props.removeRoomsCallback}  
                            callbackAddBathroom = { props.addBathroomsCallback} 
                            callbackRemoveBathroom = {props.removeBathroomsCallback}
                        />
        case 3 : return <Done priceCallback = { props.priceCallback } descriptionCallback ={props.addDescriptionCallback} termsCallback = {props.termsCallback} dateCallback = {props.selectDateCallback} dateRange = {props.dateRange}/>   
        default : return;
    }
}

function FirstStep(props){
    let token = JSON.parse(localStorage.getItem('auth')).token;
    token = token.split('.')[1]
    const buffer = Buffer.from(token,'base64');
    const str = buffer.toString('ascii');
    const user = JSON.parse(str);
    const ctx = useContext(AppContext);

    const handleNext = (e)=> {
        e.preventDefault();
        ctx.nextStep();
    }

    return(
        <div className ="form-step form-step0">
             <h1>
                Bonjour     
                <span style = {{color : 'rgb(255,63 ,55)', marginLeft : "1%"}}>{user.first_name},</span>
                <br/>
                Nous allons vous aidez à publier
                <br/>
                votre annonce.
            </h1>
            <h2>
                <span>Etape 1</span><br/>
                Où est situé votre logement ?
            </h2>
            <input type="text" name = 'city_name' placeholder = "city" onChange = {props.callback}/>
            <button onClick = { handleNext }>continuer</button>
            
        </div>
    )
}

function SecondStep(props){

    return(
        <div className ="form-step form-step1">
            <h2>De quel type de logement s'agit-il ?</h2>
            <p>Choissez un type de logement</p>
            <select name="name" onChange = { props.callback }>
                <option value ="">Sélectionner une option</option>
                <option value ="Appartement">Appartement</option>
                <option value ="Maison">Maison</option>
                <option value ="Villa">Villa</option>
                <option value ="Boutique-hôtel">Boutique-hôtel</option>               
                <option value ="Chambre d'hôte">Chambre d'hôte</option>               
            </select>
        </div>
    )
}

function ThirdStep(props){
    return(
        <div className ="form-step form-step2">
            <h2>Combien de voyageur pouvez vous accueillir</h2>
            <p>Vérifiez que vous disposez de suffisamment de lits pour assurer le comfort de tous vos voyageurs</p>
            <div className='counter'>
                <span>nombres de Voyageurs</span>
                <div>
                    <RemoveCircleIcon onClick = { props.callbackRemoveGuest } className = "action-icon"/>
                    <span className = "count">{ props.max_guests }</span>
                    <AddCircleIcon onClick = {props.callbackAddGuest } className = "action-icon"/>
                </div>
                
            </div>
            <div className='counter'>
                <span>nombres de chambres</span>
                <div>
                    <RemoveCircleIcon onClick = { props.callbackRemoveRoom } className = "action-icon"/>
                    <span className = "count">{ props.rooms }</span>
                    <AddCircleIcon onClick = { props.callbackAddRoom } className = "action-icon"/>
                </div>
            </div>
            <div className='counter'>
                <span>Salles de Bain</span>
                <div>
                    <RemoveCircleIcon onClick = { props.callbackRemoveBathroom } className = "action-icon"/>
                    <span className = "count">{ props.bathrooms }</span>
                    <AddCircleIcon onClick = { props.callbackAddBathroom } className = "action-icon"/>
                </div>
            </div>
       </div>   
    )   
}

function Done(props){

    const [selectionRange, selectRange] = useState({startDate : new Date(), endDate : new Date()})

    const handleTermscheked  = () =>{
        if( !document.querySelector('input[type=checkbox]').checked)
            document.querySelector('p').style.color = 'red';
    }

    const handleCalendarActive  = () =>{
        document.querySelector('.calendar-wrapper').classList.toggle('calendar-wrapper-active');
    }
    return(
        <div className ="form-step form-step-lastStep">
            <div>
                <label htmlFor="price" >Prix à la nuit</label>
                <input type="text" id = "price" name = "price_by_night" onChange = { props.priceCallback } placeholder = "16"/>
                <p>€</p>
            </div>
            <input type="text" placeholder = "Description" style = {{ height : "50px" }} onChange={props.descriptionCallback}/>
            
            <Button className = "calendar-handler" name="" id="" onClick = { handleCalendarActive }>
                ajouter une disponibilité
            </Button>

            <Calendar ranges={ [props.dateRange] } className = 'calendar-wrapper calendar-wrapper-disable' onChange= { props.dateCallback }/>
           
            <div className="termOfCondition">   
                <input type="checkbox" id = "check" onChange = {props.termsCallback}/>
                <p>
                    En plaçant votre demande dans le formulaire de demande, vous confirmez avoir pris connaissance et accepté les Termes et Conditions Générales. 
                </p>
            </div>
            {/* <label htmlFor="check"></label> */}
            <input type = "submit" value = "valider" onClick = { handleTermscheked }/>
        </div>
    )
}

export default FormComponent;