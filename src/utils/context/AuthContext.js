import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from'./appContext';

const AuthCtx = React.createContext();

function AuthContext(props) {

    const [logResponse, setLogResponse] = useState({});
    const [isAuth, setAuth] = useState(false);
    const appCtx = useContext(AppContext);

    const loadResponse = (newResponse)=> setLogResponse( response => newResponse);

    useEffect(()=>{

        if(logResponse.status){
            appCtx.changeActive();
            localStorage.setItem('auth', JSON.stringify(logResponse.data));
        }    
       
    },[logResponse])    
    
    useEffect(()=>{

        if(localStorage.getItem('auth')){
            setAuth( isAuth => true);
            localStorage.setItem('isAuth', true);
        }
        else{
            setAuth( isAuth => false);
            localStorage.setItem('isAuth', false);
            console.log('not')

        }
    }, [localStorage.getItem('auth')])


    const val = {
        load : loadResponse,
        response : logResponse,
        isAuth : isAuth
    }

    return (
        <AuthCtx.Provider value = { val }>
            {props.children}
        </AuthCtx.Provider>   
    )
}

export { AuthCtx };
export default AuthContext;
