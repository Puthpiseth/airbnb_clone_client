import React, {useState, useEffect} from 'react';

const AppContext = React.createContext();

function AppC(props){

    const [ active, setActive] = useState(0);
    const [ height, setHeight] = useState(0);
    const [addPlaceFromStep, setStep] = useState(0);
    const [loginDisplay , setDisplay] = useState("none");
    const [cityResultFetch, setFetchCity] = useState([]);

    //if login card displayed we can't scroll homepage anymore 
    const [homePageState, setState] = useState({overflowY : "scroll", height : "100%"});
    const [place, setItem] = useState([]);
    
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

    useEffect(()=>{
        // console.log(place)
    }, [place])

    const changeActive = () => setActive( active => active < 1 ? active + 1 : 0 );
    //go to the previous step to add a place form step in host page
    const nextStep   = () => setStep(step => step < 3 ? step +1 : step);
    //go to the next step to add a place form step in host page
    const prevStep = ()=> setStep (step => step > 0 ? step -1 : step);
    //Add a place
    const addPlaceItem = (item) => setItem (place => [...place,item]);
    //Search by city result
    const fetchByCity = (result) => setFetchCity( items => [...result]);

    const value = {
        changeActive : changeActive,
        height : height,
        display : loginDisplay,
        homePageState : homePageState,
        step : addPlaceFromStep,
        nextStep : nextStep,
        prevStep : prevStep,
        place : place,
        addPlaceItem : addPlaceItem,
        fetchByCity : fetchByCity,
        cityResultFetch : cityResultFetch
    }
    
    return(
        <AppContext.Provider value={ value } >
            {props.children}
        </AppContext.Provider>   
    )
}

export {AppContext};
export default AppC;