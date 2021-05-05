import React, {useState, useEffect} from 'react';

const AppContext = React.createContext();

function AppC(props){

    const [ active, setActive] = useState(0);
    const [ height, setHeight] = useState(0);
    const [loginDisplay , setDisplay] = useState("none");

    const changeActive = () => setActive( active => active < 1 ? active + 1 : 0 );
    
    useEffect(()=>{
        if(active > 0){
            setHeight(height => "100%");
            setDisplay(display => "block");
        }
        else{
            setHeight(height => 0);
            setDisplay(display => "none");

        }
    },[active]);

    const value = {
        changeActive : changeActive,
        height : height,
        display : loginDisplay
    }
    return(
        <AppContext.Provider value={ value } >
            {props.children}
        </AppContext.Provider>   
    )
}

export {AppContext};
export default AppC;