import CreatorView from './CreatorView';
import Analytics from './Analytics';
import Card from './profView';
import PasswordRecovery from './PasswordRecovery';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path = "/" element={<CreatorView/>}/>
            <Route path = "/analytics" element={<Analytics/>}/>
            <Route path = "/profile" element={<Card/>}/>
            <Route path = "/reset" element = {<PasswordRecovery/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
