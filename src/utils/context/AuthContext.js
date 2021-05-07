import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from'./appContext';

const AuthCtx = React.createContext();

function AuthContext(props) {

    const [logResponse, setLogResponse] = useState({});
    const appCtx = useContext(AppContext);

    const loadResponse = (newResponse)=> setLogResponse( response => newResponse);

    useEffect(()=>{
        if(logResponse.status === 200){
            appCtx.changeActive();
        }
    }, [logResponse])    

    useEffect(()=>{

        if(logResponse.status){
            localStorage.setItem('auth', JSON.stringify(logResponse.data));
        }    
       
    },[logResponse])    
        
    const val = {
        load : loadResponse,
        response : logResponse,
    }

    return (
        <AuthCtx.Provider value = { val }>
            {props.children}
        </AuthCtx.Provider>   
    )
}

export { AuthCtx };
export default AuthContext;
