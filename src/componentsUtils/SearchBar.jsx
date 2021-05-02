import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Calendar } from 'react-date-range';
import '../styleSheets/SearchBar.scss';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

function SearchBar(){

    const [display, setDisplay] = useState('none');
    const [active, setActive] = useState(false);
    const [state, setState] = useState(0);
    const [start, setStart] = useState(null);
    const [end , setEnd] = useState(null);

    //changing button that displays calendar
    const [buttonText, setButtonText] = useState('search date');

    //Select date range
    const [selectionRange, setSelectionRange] = useState({
                                                           startDate: null,
                                                           endDate: null
                                                        })


    const handleClickCalendarActive= () => setActive(active => !active);




    // diplay or hide calendar and change button text
    useEffect(()=>{

        if(active){
            
            setDisplay( display => "block" );
            setButtonText( text => "Hide");
        }
        else{
            setDisplay( display => "none" );
            setButtonText( text => "search date");
        }
    },[active]);

    /**
     * select specific field for start and end dates
     * 1 corresponds to start date field
     * 2 corresponds to end date field
     */
    const handleSelect = (e)=>{
        
        setState ( state => state >= 1 ? 0 : state + 1);
        state > 0 ? setEnd(end => e) : setStart(start => e);
    }

    /**
     * apply dates
     */
    useEffect(()=>{

        if( new Date(start).getTime() > new Date(end).getTime()){

            setSelectionRange({
                startDate: end,
                endDate :start
            }) 
        }
        else{

            setSelectionRange({
                startDate: start,
                endDate : end
            })
        }
    },[start, end])

    return(
        <div className = 'search-bar-wrapper'>
            <form action="" className = "search-bar-form">
                <SearchIcon className='search-icon'/>
                <div>
                    <input type="text" className ="city"/>
                    <input type="text" className = "date"/>
                </div>
                <input type="submit"/>
            </form>

            <div className ="search-bar-date-wrapper">
                <button onClick = { handleClickCalendarActive }>{ buttonText }</button>
                <div style={ { display : display }}>
                    <Calendar className = "calendar"  ranges={ [selectionRange] } onChange={ handleSelect }/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;