import './App.css';
import Home from './pages/home/Home';
import Hote from './pages/hote/Hote';
import Details from './pages/details/Details'
import ModifInfo from './pages/hote/ModifInfo';
import Touriste from './pages/touriste/Touriste';


import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import PrivateRoute from './utils/componentsUtils/PrivateRoute';

function PrivateRoute(props) {
  
  const isAuth = localStorage.getItem('isAuth');
  const role = JSON.parse(localStorage.getItem('auth')).role;

  if(isAuth === 'true' && role === props.autorization){
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
              <PrivateRoute exact path = '/hote' component ={ Hote } autorization = "hote"/>
              <Route exact path ='/details/:id' component = { Details } />
              <Route  path ='/modif' component = { ModifInfo} />
              <PrivateRoute path = '/touriste' component = {Touriste} autorization = 'touriste' />
            </Switch>
      </Router>
  );
}
export default App;
