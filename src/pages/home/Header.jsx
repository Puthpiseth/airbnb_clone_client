import { useContext } from 'react';
import SearchBar from '../../utils/componentsUtils/SearchBar';
import Banner from './Banner';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../../assets/styleSheets/Header.scss';
import {AppContext} from '../../utils/context/appContext';

function Header(){

    const context = useContext(AppContext);

    const handleClick = ()=> context.changeActive();
        
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
                    <AccountCircleIcon onClick = { handleClick }className="option-icon"/>
                </a>
            </div>
        </header>
    )
}

export default Header;