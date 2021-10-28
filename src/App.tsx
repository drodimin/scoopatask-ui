import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shell from './components/Shell';
import { Typography } from '@mui/material';


const App = () => {  
  if(process.env.REACT_APP_BLOCK && process.env.REACT_APP_BLOCK === 'Yes') {
    return <Typography sx={{m:"auto"}} width="fit-content" variant="h4">Service Not Available</Typography>
  }
  else {
    return <Router>
          <Route exact path="/" component={Shell} />
        </Router>
  }
}

export default App;
