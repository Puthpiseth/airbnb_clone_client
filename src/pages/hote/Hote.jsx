import NavBar from './NavBar';
import '../../assets/styleSheets/Hote.scss';
import FormComponent from './FormComponent'

function Hote(props) {
        return (
            <div className ="Hote-page-wrapper">
                <NavBar/>
                <FormComponent/>
            </div>
        )
}

export default Hote;
