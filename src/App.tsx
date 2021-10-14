import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Shell from './components/Shell';


const App = () => {  
  return (
    <Router>
      <Shell></Shell>
    </Router>
  );
}

export default App;
