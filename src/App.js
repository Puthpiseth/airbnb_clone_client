import './App.css';
import Home from './pages/home/Home';
import Hote from './pages/hote/Hote';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './utils/componentsUtils/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {Home}/>
        <PrivateRoute exact path = '/hote' component ={Hote} />
      </Switch>
    </Router>
  );
}

export default App;
