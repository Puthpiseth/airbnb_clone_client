import SearchBar from '../../utils/componentsUtils/SearchBar';
import Banner from './Banner';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../../assets/styleSheets/Header.scss';

function Header(){

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
                    <a href='/'>
                        <AccountCircleIcon className="option-icon"/>
                    </a>
            </div>
            
        </header>
    )
}

export default Header;