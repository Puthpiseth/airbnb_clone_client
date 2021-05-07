import { useContext } from 'react';
import NavBar from './NavBar';
import { AuthCtx } from '../../utils/context/AuthContext';

function Hote(props) {
    const authCtx = useContext( AuthCtx )
        return (
            <div>
                <NavBar/>
            </div>
        )
    
}

export default Hote;
