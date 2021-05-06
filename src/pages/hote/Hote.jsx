import { useContext } from 'react';
import NavBar from './NavBar';
import { AuthCtx } from '../../utils/context/AuthContext';

function Hote(props) {
    const authCtx = useContext( AuthCtx )
    
    // if(authCtx.reponse.token !== "undifined"){
        return (
            <div>
                <NavBar/>
            </div>
        )
    // }
    // props.history.push('/');
    // return;
    
}

export default Hote;
