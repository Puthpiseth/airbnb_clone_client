import React,{useState, useEffect, useContext} from 'react';
import '../../assets/styleSheets/SignComponent.scss';
import CloseIcon from '@material-ui/icons/Close';
import {AppContext} from '../context/appContext';

function SignComponent(props){

    const context = useContext( AppContext );

    return (
        <div className="signup-login-card-wrapper" style = {{ height : context.height }} onClick = {() => context.changeActive() } >
            <form className="signup-login-card" >
                <div className="upper-card-block">
                    <CloseIcon className="close-icon" onClick = { () => context.changeActive() }/>  
                    {/* <p>sign in</p> */}
                    <h2>sign up</h2>
                </div>
                <div style = { { width:"75%" } }>
                    <input type="text" name="first_name" />
                    <input type="text" name="last_name" />
                    <input type="text" name="email" />
                    <input type="text" name="role" />
                    <input type="text" name="password" />
                </div>
                <input type="submit"/>
                {/* <p> You already have an account ?<a href="#" alt=""> sign in</a></p> */}
                <p> You haven't an account ?<a href="/">sign up</a></p>
            </form>
        </div>
    );
}

export default SignComponent;