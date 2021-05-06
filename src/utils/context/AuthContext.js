import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from'./appContext';

const AuthCtx = React.createContext();

function AuthContext(props) {

    const [logResponse, setLogResponse] = useState({});
    const appCtx = useContext(AppContext);

    const loadResponse = async (newResponse)=> await setLogResponse( response => newResponse);

    useEffect(()=>{
        if(logResponse.status === 200){
            appCtx.changeActive();
        }
        
    return ()=> setLogResponse(resp =>{});
    },[logResponse])

    const val = {
        load : setLogResponse,
        response : logResponse
    }

    return (
        <AuthCtx.Provider value = { val }>
            {props.children}
        </AuthCtx.Provider>   
    )
}

export { AuthCtx };
export default AuthContext;
