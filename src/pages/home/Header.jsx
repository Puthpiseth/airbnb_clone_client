import { useContext, useEffect } from 'react';
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
    console.log(authCtx);
    const handleClick = ()=> context.changeActive();

    useEffect(()=>{
        
        if(authCtx.response.status === 200){
            setOptionBarView()
        }
    })

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
                <a href="/">
                    <FavoriteIcon className="option-icon"/>
                </a>
                <a href = '#'>
                    <AccountCircleIcon onClick = { handleClick } className="option-icon login-option"/>
                </a>
                <a className="option-icon-disable" href = '#'>
                    <ChatBubbleOutlineIcon className="option-icon "/>
                </a>
                <a className="option-icon-disable" href = '#'>
                    <img src={AirbnbIcon} className="option-icon"/>
                </a>
                <a className="option-icon-disable" href = '#'>
                    <AccountCircleIcon className="option-icon"/>
                </a>
            </div>
        </header>
    )
}

export default Header;