import { useState } from 'react';
import '../../assets/styleSheets/ModifInfo.scss';
import {edit_place, remove_a_place} from '../../utils/services/host';

function ModifInfo(props){

    let newInfos = [];
    let newInfoFilter = [];
    let inputError = [];
    const numbers = ["max_guests","rooms", "bathrooms", "price_by_night"];
    let elements = [];
    

    const handleClickFieldsActive = () => document.querySelector('.step-2').classList.toggle('step-2-active');

    const handleRemove = async(e)=>{
        
        try{
            const response = await remove_a_place(props.match.params.id);
            if(response.status === 200){
                props.history.push('/')
            }
        }
        catch(err){
            props.history.push('/')
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = e.target.elements.name.value;
        const max_guests = e.target.elements.max_guests.value; 
        const rooms = e.target.elements.rooms.value;
        const bathrooms = e.target.elements.bathrooms.value;
        const price_by_night = e.target.elements.price_by_night.value;
        const description = e.target.elements.description.value;
        elements = [
            e.target.elements.max_guests, 
            e.target.elements.rooms, 
            e.target.elements.bathrooms, 
            e.target.elements.price_by_night
        ]
        newInfos = [
            ["name",`'${name}'`],
            ["max_guests",`${max_guests}`],
            ["rooms",`${rooms}`],
            ["bathrooms",`${bathrooms}`],
            ["price_by_night",`${price_by_night}`],
            ["description",`'${description}'`]
        ]        
        newInfoFilter = newInfos.filter(el => el[1] && el[1] !== "");
        inputError  = newInfoFilter.filter(el => numbers.indexOf(el[0]) !== -1 && isNaN(Number(el[1])));
        
        if(inputError.length){
            inputError = inputError.map( el => numbers.indexOf(el[0]));
            inputError.forEach( index =>{
                elements[index].style.border = '3px solid red';
            })
            document.querySelector('.step-1').scrollIntoView({behavior:'smooth'});
        }
        else{
            if(window.confirm("Êtes-vous sûr ?")){
                newInfoFilter = newInfoFilter.map((el) => numbers.indexOf(el[0]) !== -1 ? [el[0],Number(el[1])]: el);
                newInfoFilter.forEach(el => console.log(typeof el[1]))
                try{
                    await edit_place(newInfoFilter, props.match.params.id);
                }catch(err){
                    props.history.push('/');
                }
            }
        }
    }

    return(
        <form className = "main-wrapper" onSubmit = { handleSubmit }>            
            <p className ="step step-1">
                <span>Étape 1</span>
                <span>
                    Chambres, salles de bains, nombre de voyaguers,etc... 
                </span>
                <span className = "main-options-container">
                    <span onClick = { handleClickFieldsActive }>Modifier</span>
                    <span onClick = { handleRemove }>Retirer l'annonce</span>
                </span>
                
            </p>            

            <div className ="step step-2 ">
                <label htmlFor="name">name</label>
                <input type="text" name="name" id="name"/>
                <label htmlFor="max_guests">max_guests</label>
                <input type="text" name="max_guests" id="max_guests"/>
                <label htmlFor="rooms">rooms</label>
                <input type="text" name="rooms" id="rooms"/>
                <label htmlFor="bathrooms">bathrooms</label>
                <input type="text" name="bathrooms" id="bathrooms"/>
                <label htmlFor="price_by_night">price_by_night</label>
                <input type="text" name="price_by_night" id="price_by_night"/>
                <label htmlFor="description">description</label>
                <input type="text" name="description" id="description"/>
            </div>
            <div  className ="step step-3">
                <span>Étape 2</span>
                <span>
                    photos... 
                </span>
                <button className = "validate-modif">Modifier</button>
            </div>
            <input type="submit" value='Valider' className = "validate-modif"/>
        </form>
    )
}

export default ModifInfo;