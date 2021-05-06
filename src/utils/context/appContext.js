import React, {useState, useEffect} from 'react';

const AppContext = React.createContext();

function AppC(props){

    const [ active, setActive] = useState(0);
    const [ height, setHeight] = useState(0);
    const [loginDisplay , setDisplay] = useState("none");
    //if login card displayed we can't scroll homepage anymore 
    const [homePageState, setState] = useState({overflowY : "scroll", height : "100%"});

    const changeActive = () => setActive( active => active < 1 ? active + 1 : 0 );
    
    useEffect(()=>{
        if(active > 0){
            setHeight(height => "100%");
            setDisplay(display => "block");
            setState( state => ({overflowY : "hidden", height : "93vh"}));
        }
        else{
            setHeight(height => 0);
            setDisplay(display => "none");
            setState( state => ({overflowY : "scroll", height : "100%"}));

        }
    },[active]);


    const value = {
        changeActive : changeActive,
        height : height,
        display : loginDisplay,
        homePageState : homePageState,
        
    }
    return(
        <AppContext.Provider value={ value } >
            {props.children}
        </AppContext.Provider>   
    )
}

export {AppContext};
export default AppC;