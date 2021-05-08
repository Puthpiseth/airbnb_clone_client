import {useEffect, useContext} from 'react';
import {AppContext} from '../../utils/context/appContext';
import Button from '@material-ui/core/Button';
import '../../assets/styleSheets/FormStepSwitcher.scss'

function FormStepSwitcher(props){

    const ctx = useContext(AppContext);
    

    useEffect(()=>{
        if(ctx.step > 0){
            document.querySelector('.step-switcher').classList.add('step-switcher-active');
            return;
        }
        document.querySelector('.step-switcher').classList.remove('step-switcher-active');

    })

    useEffect(()=>{
        if(ctx.step === 3){
            document.querySelector('.next').classList.add('next-disable');
        }
        else{
            document.querySelector('.next').classList.remove('next-disable');
        }
    }, [ctx.step])
    const handlePrevStep = () =>{
        ctx.place.pop();
        ctx.prevStep();
    }

    const handleNextStep = () =>{
        ctx.nextStep();
    }
    return(
        <div className = "step-switcher">
            <Button onClick = { handlePrevStep}>Précedent</Button>
            <Button onClick= { handleNextStep } className = "next">Suivant</Button>
        </div>
    )
}

export default FormStepSwitcher;