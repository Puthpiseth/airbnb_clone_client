import React {useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext();

function AuthContext(props) {
    return (
        <div>
            <AuthContext.Provider value={ value } >
            {props.children}
        </AuthContext.Provider>   
        </div>
    )
}

export default AuthContext
