import React,{useState, useContext, useEffect} from 'react';
import '../../assets/styleSheets/SignComponent.scss';
import CloseIcon from '@material-ui/icons/Close';
import {AppContext} from '../context/appContext';
import {signUp, logIn} from '../services/utilsRequestFunctions';
import { AuthCtx } from '../context/AuthContext';
//line 86
const buttonChangeLogStyle ={
    border : "none",
    color : "blue",
    background : "inherit"
}

function SignComponent(props){
    
    const [linkText, setText] = useState({ text:"You haven't an account ?", buttonText : "sign up" });
    /**
     * allow to know which face we're on
     * O -> sign up 
     * 1 -> sign in/ log in
     */
    const [cardFace, setFace] = useState(0);
    //if we're on signup all fields are displayed
    const [displayFields, setDisplay] = useState("block");
    const [response,setResponse] = useState({});
    const context = useContext( AppContext );
    const authCtx = useContext( AuthCtx );

    useEffect(()=>{

       const fields =  Array.from(document.querySelectorAll('.field'));
       const fieldsLabel = Array.from(document.querySelectorAll('.field-label'));
       
       fields.forEach(field => field.addEventListener('focus', (e)=>{
            fieldsLabel[ fields.indexOf(e.target) ].classList.add('field-active') ;
        }))

        fields.forEach(field => field.addEventListener('blur', (e)=>{

            if(e.target.value === ""){

             fieldsLabel[fields.indexOf(e.target)].classList.remove('field-active');
            }
        }))    
    },[])

    useEffect(()=>{
        if(cardFace === 0){
            setText(text =>({text:"haven't an account ?", buttonText : "sign up" }));
            setDisplay(display => "block");
        }

        else{
            setText(text =>({text:"already have an account ?", buttonText : "Log in" }))
            setDisplay(display => "none");
        }

    }, [cardFace])

    const handleClick = async ()=> await setFace( state =>  state < 1 ? state+1 : 0);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const userArr = Array.from(e.target.elements).slice(0, 5);
        let response = {};

        if(cardFace !== 0){
            response = await logIn(userArr);
            await authCtx.load(response);
            
        }
        else{
            response = signUp(userArr);
        }
    }

    return (
        <div className="signup-login-card-wrapper" style = {{ height : context.height }} >
            <form className="signup-login-card" onSubmit = { handleSubmit }>
                <div className="upper-card-block">
                    <CloseIcon className="close-icon" onClick = { () => context.changeActive() }/>  
                    {/* <p>sign in</p> */}
                    <h2><strong> { linkText.buttonText }</strong></h2>
                </div>
                <div style = { { width:"75%" } } className = 'fields'>
                    <input style = {{ display : displayFields }} className = "field" type="text" id = "first-name"  name="first_name" />
                    <label style = {{ display : displayFields }} className = "field-label"htmlFor="first-name">enter your first-name</label>
                    <input style = {{ display : displayFields }} className = "field" type="text" id = "last-name" name="last_name" />
                    <label style = {{ display : displayFields }} className = "field-label"htmlFor="last-name">enter your last-name</label>
                    <input className = "field" type="text" id = "email"  name="email" />
                    <label className = "field-label"htmlFor="email">enter your email</label>
                    <input style = {{ display : displayFields }} className = "field" type="text" id = "role"  name="role" />
                    <label style = {{ display : displayFields }} className = "field-label"htmlFor="role">enter your role</label>
                    <input className = "field" type="text" id = "password" name="password" />
                    <label className = "field-label" htmlFor="passWord">enter your password</label>
                </div>
                <input type="submit"/>
                {/* <p> You already have an account ?<a href="#" alt=""> sign in</a></p> */}
                <p>
                    { linkText.text }
                    <span onClick= { handleClick } style = { buttonChangeLogStyle }>
                         { linkText.buttonText } 
                    </span>
                </p>
            </form>
        </div>
    );
}

export default SignComponent;