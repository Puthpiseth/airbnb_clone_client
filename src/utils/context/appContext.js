import React, {useState, useEffect} from 'react';


const AppContext = React.createContext();


function AppC(props){

    const [ active, setActive] = useState(0);
    const [ height, setHeight] = useState(0);

    const changeActive = () => setActive( active => active < 1 ? active + 1 : 0 );
    
    useEffect(()=>{
        if(active > 0){
            setHeight(height => "100%");
        }
        else{
            setHeight(height => 0);
        }
    },[active]);

    const value = {
        changeActive : changeActive,
        height : height
    }
    return(
        <AppContext.Provider value={ value } >
            {props.children}
        </AppContext.Provider>   
    )
}

export {AppContext};
export default AppC;