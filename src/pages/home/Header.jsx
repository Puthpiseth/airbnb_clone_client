import { useState, useContext, useEffect } from 'react';
import SearchBar from '../../utils/componentsUtils/SearchBar';
import Banner from './Banner';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AirbnbIcon from '../../assets/images/airbnb.svg';
import '../../assets/styleSheets/Header.scss';
import {AppContext} from '../../utils/context/appContext';
import { AuthCtx } from'../../utils/context/AuthContext';

function Header(){

    const context = useContext(AppContext);
    const authCtx = useContext( AuthCtx );
    const [role, setRole] = useState('');
    const [profilePath, setPath] = useState('/');
    // const [displayIfisLogged, setDisplay] = useState("flex");
    const handleClick = ()=> context.changeActive();

    useEffect(()=>{
        
        if(authCtx.response.status === 200){
            setOptionBarView();
        }
    })
    useEffect(()=>{

        if(authCtx.isAuth){
            document.querySelector('.login-option-container').classList.add('option-disable');
            setRole( role => JSON.parse(localStorage.getItem('auth')).role);
        }
        else{
            document.querySelector('.login-option-container').classList.remove('option-disable');
            setRole(role => '');
        }

    }, [authCtx.isAuth])

    useEffect(()=>{
        if(role === 'hote'){
            setPath(path => '/hote');
            document.querySelector('.option-icon-disable.voyage-option-container').classList.add('option-disable');
            document.querySelector('.bookmarks-option-container').classList.add('option-disable');
            
        }
        else if(role === 'touriste'){
            setPath(path => '/touriste');
            document.querySelector('.option-icon-disable').style.dispay = "flex";
            document.querySelector('.bookmarks-option-container').style.dispay = "flex";
        }
    },[role])

    const setOptionBarView = ()=>{
        const optionIconTochange = Array.from(document.querySelectorAll('.option-icon-disable'));
        optionIconTochange.forEach( optionIcon => optionIcon.classList.add('option-icon-active'));
        
        // const loginIcon = document.querySelector('.option-icon.login-option').classList.add('option-icon-disable');
        // console.log(loginIcon)
    }
        
    return(
        <header>
            <SearchBar/>
            <Banner/>
            <div className="options-nav">
                <a href="/">
                    <SearchIcon className="option-icon"/>
                </a>
                <a href="/" className = "bookmarks-option-container">
                    <FavoriteIcon className="option-icon"/>
                </a>
                <a href = '#' className ='login-option-container'>
                    <AccountCircleIcon onClick = { handleClick } className="option-icon login "/>
                </a>
                <a className="option-icon-disable" href = '#'>
                    <ChatBubbleOutlineIcon className="option-icon "/>
                </a>
                <a className="option-icon-disable voyage-option-container" href = '#'>
                    <img src={AirbnbIcon} className="option-icon"/>
                </a>
                <a className="option-icon-disable" href = {profilePath}>
                    <AccountCircleIcon className="option-icon"/>
                </a>
            </div>
        </header>
    )
}

export default Header;