import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shell from './components/Shell';


const App = () => {  
  return (
    <Router>
      <Route exact path="/" component={Shell} />
    </Router>
  );
}

export default App;
