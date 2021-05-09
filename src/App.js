import './App.css';
import Home from './pages/home/Home';
import Hote from './pages/hote/Hote';
import Details from './pages/details/Details'
import ModifInfo from './pages/modifPage/ModifInfo';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import PrivateRoute from './utils/componentsUtils/PrivateRoute';

function PrivateRoute(props) {
  
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
              <Route exact path ='/details/:id' component = { Details } />
              <Route  path ='/details/:id/modifier' component = { ModifInfo} />
            </Switch>
      </Router>
  );
}

export default App;
