import {useContext} from 'react';
import {AppContext} from '../../utils/context/appContext';
import Button from '@material-ui/core/Button'

function FormStepSwitcher(props){

    const ctx = useContext(AppContext);
    return(
        <div className = "step-switcher">
            <Button onClick = {()=> ctx.prevStep()}>Précedent</Button>
            <Button onClick= {()=>ctx.nextStep()}>Suivant</Button>
        </div>
    )
}

export default FormStepSwitcher;