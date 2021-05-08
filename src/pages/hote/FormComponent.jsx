import {useState,useEffect, useContext} from 'react';
import '../../assets/styleSheets/FormComponent.scss';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {AppContext} from '../../utils/context/appContext';
import FormStepSwitcher from '../../utils/componentsUtils/FormStepSwitcher';
import { Description } from '@material-ui/icons';

function FormComponent(){

    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [max_guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [price, setPrice] = useState(10);
    const [termsAccepted, setAccept] = useState(false);
    
    const ctx = useContext(AppContext);


    const handleCity = (e)=> setCity(city => e.target.value );
    const handleName = (e)=> setName(name => e.target.value );
    const handleAddGuests = () => setGuests(guests => guests + 1);
    const handleRemoveGuests = () => setGuests(guests => guests > 1 ? guests - 1 : guests);
    const handleAddRooms = () => setRooms(rooms => rooms + 1);
    const handleRemoveRooms = () => setRooms(rooms => rooms > 1 ? rooms - 1 : rooms);
    
    const handleAddBathrooms = () => setBathrooms(bathrooms => bathrooms + 1);
    const handleRemoveBathRooms = () => setBathrooms(bathrooms => bathrooms > 1 ? bathrooms  - 1 : bathrooms );
    const checkIfTermsAccepted = (e) => setAccept(accept => e.target.checked?true : false);
    const handlePriceChanges = (e) => setPrice(price =>  e.target.value);
    

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!termsAccepted)
            return;
        
        console.log(city, name, max_guests, rooms, bathrooms, price)
    }

    return(
        <form onSubmit = {handleSubmit} >
            <WhichOne max_guests = {max_guests} rooms = {rooms} bathrooms = {bathrooms} step = {ctx.step} cityCallback = {handleCity} nameCallback = {handleName} addGuestCallback = {handleAddGuests} removeGuestsCallback = {handleRemoveGuests}  addRoomsCallback = {handleAddRooms} removeRoomsCallback = {handleRemoveRooms} addBathroomsCallback = {handleAddBathrooms}  removeBathroomsCallback = {handleRemoveBathRooms} priceCallback = {handlePriceChanges} termsCallback = {checkIfTermsAccepted}/>
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

        case 3 : return <Done callback = { props.priceCallback } termsCallback = {props.termsCallback}/>   
        default : return;
    }
}

function FirstStep(props){

    const ctx = useContext(AppContext);

    const handleNext = (e)=>{
        const city = document.querySelector('input ').value
        e.preventDefault();
        ctx.nextStep();
    }

    return(
        <div className ="form-step form-step0">
             <h1>
                Bonjour {props.name},
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

    const handleTermscheked  = () =>{
        if( !document.querySelector('input[type=checkbox]').checked)
                document.querySelector('p').style.color = 'red';
    }

    return(
        <div className ="form-step form-step-lastStep">
            <div>
                <label htmlFor="price">Prix à la nuit</label>
                <input type="text" id = "price" name = "price_by_night" onChange = { props.callback }/>€
            </div>
            <input type="text" placeholder = "Description" style = {{ height : "50px" }}/>
            <div>   
                <input type="checkbox" id = "check" onChange = {props.termsCallback}/>
                <p>
                    En plaçant votre demande dans le formulaire de demande, vous confirmez avoir pris connaissance et accepté les Termes et Conditions Générales. 
                </p>
            </div>
            <label htmlFor="check"></label>
            <input type = "submit" value = "valider" onClick = { handleTermscheked }/>
        </div>
    )
}

export default FormComponent;