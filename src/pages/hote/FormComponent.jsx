import {useState, useContext} from 'react';
import '../../assets/styleSheets/FormComponent.scss';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {AppContext} from '../../utils/context/appContext';
import FormStepSwitcher from '../../utils/componentsUtils/FormStepSwitcher';

function FormComponent(){

    const [max_guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(0);
    const [price, setPrice] = useState(10);
    const ctx = useContext(AppContext);

    const handleAddGuests = () => setGuests(guests => guests + 1);
    const handleRemoveGuests = () => setGuests(guests => guests - 1);

    const handleAddRooms = () => setRooms(rooms => rooms + 1);
    const handleRemoveRooms = () => setRooms(rooms => rooms - 1);
    
    const handleAddBathrooms = () => setBathrooms(bathrooms => bathrooms + 1);
    const handleRemoveBathRooms = () => setBathrooms(bathrooms => bathrooms - 1);

    const handlePriceChanges = (e) => setPrice(price => e.target.value);

    // const handleSubmit = (e) => 

    return(
        <form action="" >
            <WhichOne max_guests = {max_guests} rooms = {rooms} bathrooms = {bathrooms} step = {ctx.step}/>
            <FormStepSwitcher/>
        </form>
    )
}

function WhichOne(props){
    switch(props.step){
        case 0 : return <FirstStep name = {props.name} />
        case 1 : return <SecondStep/>
        case 2 : return <ThirdStep max_guests = {props.max_guests} rooms = {props.rooms} bathrooms = {props.bathrooms}/>
        case 3 : return <Done/>   
    }
}

function FirstStep(props){
    return(
        <div className ="form-step1">
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
            <input type="text" name = 'city_name' placeholder = "city"/>
            <button>continuer</button>
        </div>
    )
}

function SecondStep(){
    return(
        <div>
            <h2>De quel type de logement s'agit-il ?</h2>
            <p>Choissez un type de logement</p>
            <select name="name" >
                <option value ="">Sélectionner une option</option>
                <option value ="flat">Appartement</option>
                <option value ="">Maison</option>
                <option value ="">Villa</option>
                <option value ="">Boutique-hôtel</option>               
                <option value ="">Chambre d'hôte</option>               
            </select>
        </div>
    )
}

function ThirdStep(props){
    return(
        <div>
            <h2>Combien de voyageur pouvez vous accueillir</h2>
            <p>Vérifiez que vous disposez de suffisamment de lits pour assurer le comfort de tous vos voyageurs</p>
            <div className='counter'>
                <span>nombres de Voyageurs</span>
                <RemoveCircleIcon />
                <span>{ props.max_guests }</span>
                <AddCircleIcon/>
            </div>
            <div className='counter'>
                <span>nombres de chambres</span>
                <RemoveCircleIcon />
                <span>{ props.rooms }</span>
                <AddCircleIcon/>
            </div>
            <div className='counter'>
                <span>Salles de Bain</span>
                <RemoveCircleIcon />
                <span>{ props.bathrooms }</span>
                <AddCircleIcon/>
            </div>
           
       </div>   
    )   
}

function Done(){
    return(
        <div>
            <label htmlFor="price">Prix à la nuit</label>
            <input type="text" id = "price" name = "price_by_night"/>
            <input type="checkbox" id = "check"/>
            <label htmlFor="check"></label>
            <input type = "submit" value = "valider"/>
        </div>
    )
}

export default FormComponent;