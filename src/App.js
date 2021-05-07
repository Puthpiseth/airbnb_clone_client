import './App.css';
import {useState, useEffect, useContext} from 'react';
import {AuthCtx} from './utils/context/AuthContext';
import Home from './pages/home/Home';
import Hote from './pages/hote/Hote';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import PrivateRoute from './utils/componentsUtils/PrivateRoute';
import  AuthContext  from './utils/context/AuthContext';

function PrivateRoute(props) {
  
  const authCtx = useContext(AuthCtx);
  const isAuth = localStorage.getItem('isAuth');

  if(isAuth === 'true'){
    return <Route  component = { props.component } exact path = { props.path }/>
  }
  else{
    return <Route  render = { () => <Redirect to ='/' />}/>
  }
} 



function App() {
  return (
      <Router>
            <Switch>
              <Route exact path = '/' component = {Home}/>
              <PrivateRoute exact path = '/hote' component ={ Hote } />
            </Switch>
      </Router>
  );
}

export default App;
