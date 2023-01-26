import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AuthContextProvider} from './context/Context.jsx';
import Router from './Router.jsx';

axios.defaults.withCredentials = true;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

function App() {
  return (
    <AuthContextProvider>
      <Router/>
    </AuthContextProvider>
  )
}

export default App;
