import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Calendar } from 'react-date-range';
import '../../assets/styleSheets/SearchBar.scss';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import Location from '../../assets/images/location.svg';

function SearchBar(){

    const [calendarDisplay, setCalendarDisplay] = useState('none');
    const [cancelButtonDisplay, setCancelButton] = useState("none");
    const [dateSeachBtnDisplay , setDateBtn] = useState("block");
    const [autoComplete, setAutoComplete] = useState(false);
    const [active, setActive] = useState(false);
    const [start, setStart] = useState(null);
    const [end , setEnd] = useState(null);
    const [state, setState] = useState(0);
    const [fetchResult, setResult] = useState([]);
    const [fetchComplete, setFetchComplete] = useState([]);
    //changing button that displays calendar
    const [buttonText, setButtonText] = useState('search date');
    //Select date range
    const [selectionRange, setSelectionRange] = useState({startDate : new Date(), enDate : new Date()});

    useEffect(()=>{
        const arr = ["baba", "babo", "bibi", "bobo", "bobi","koko","tato", "tito"];
        setResult(result => [...arr]);

    },[])
    // diplay or hide calendar and change button text
    useEffect(()=>{
        if(active){
            
            setCalendarDisplay(calendarDisplay => "block" );
            setButtonText( text => "Hide");
        }
        else{
            setCalendarDisplay( calendarDisplay => "none" );
            setButtonText( text => "search date");
        }
    },[active]);
   
    /**
     * apply dates
     */
    useEffect(()=>{
        if( new Date(start).getTime() > new Date(end).getTime()){

            setSelectionRange({startDate : end, endDate : start});
        }
        else{

            setSelectionRange({startDate : start, endDate :end});
        }

        return ()=>{
            setSelectionRange({startDate : null,endDate : null});
        }
    },[start, end])

    const handleClickCalendarActive= ()=> setActive(active => !active);

     /**
     * select specific field for start and end dates
     * 1 corresponds to start date field
     * 2 corresponds to end date field
     */
      const handleSelect = (e)=>{
        setState ( state => state >= 1 ? 0 : state + 1 );
        state > 0 ? setEnd(end => e) : setStart(start => e);
    }
    const handleFocus = ()=>{
        setDateBtn( display => "none" );
        setCancelButton( display => "block" );
        setAutoComplete( active => true );
    } 
    const handleBlur = ()=>{
        // setDateBtn(display => "block");
        // setAutoComplete( active => false );
        // setCancelButton( display => "none" );
    } 
    const handleClick = ()=>{
        setDateBtn(display => "block");
        setCancelButton( display => "none");
        setAutoComplete( active => false);
    }
    const handleChanges = (e)=>{
            if(e.target.value === ""){
                setFetchComplete(fetchComplete =>[]);
                return;
            }
            const regValue = new RegExp(`${e.target.value}`);
            const matchArr = fetchResult.filter( el => regValue.test(el));
            setFetchComplete(fetchComplete =>[...matchArr]);
        }
    
    useEffect(()=>{

    },[fetchComplete])

    return(
        <div className = 'search-bar-wrapper'>
            <div className = 'search-bar-form-wrapper'>
                <form action="" className = "search-bar-form">
                    <SearchIcon className='search-icon'/>
                    <div>
                        <input type="text" onFocus = { handleFocus } onBlur = { handleBlur } onChange= { handleChanges }className ="city"/>
                        <input type="text" className = "date"/>
                    </div>
                    <input type="submit"/>
                </form>
                <button className='cancel-btn' onClick = { handleClick } style = {{ display : cancelButtonDisplay }}>cancel</button>
            </div>

            <AutoComplete active = { autoComplete } results = { fetchComplete }/>

            <div className ="search-bar-date-wrapper" style = {{ display : dateSeachBtnDisplay }}>
                <button onClick = { handleClickCalendarActive }>{ buttonText }</button>
                <div style={ { display : calendarDisplay }}>
                    <Calendar className = "calendar"  ranges={ [selectionRange] } onChange={ handleSelect }/>
                </div>
            </div>
        </div>
    )
}

function AutoComplete(props){

    const [display, setDisplay] = useState('none');

    useEffect(()=>{
        if(props.active){

            setDisplay(display => "block");
        }
        else{
            setDisplay(display => "none");
        }
    },[props.active])

    return(
            <ul style={{ display : display }} className= 'auto-complete-wrapper'>
                {props.results.map( (el,i) =><li key={i} style = {{ listStyleImage : `url(${Location})` }}>{el}</li>)}
            </ul>
    )
}
export default SearchBar;