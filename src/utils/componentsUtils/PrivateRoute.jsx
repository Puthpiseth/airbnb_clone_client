import {useContext} from 'react';
import { Route } from 'react-router-dom';
import { AuthCtx } from '../context/AuthContext';
import Home from '../../pages/home/Home';
import { useHistory }from "react-router";

function PrivateRoute(props) {
   
    const authCtx = useContext(AuthCtx);
    const history = useHistory();
    console.log(authCtx.response);

    // if(Object.keys(authCtx.response).length === 0){
    //     history.push('/');
    // }
    return <Route path = { props.path } component = { props.component } />
}

export default PrivateRoute

