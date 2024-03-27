import CreatorView from './pages/CreatorView';
import Analytics from './pages/Analytics';
import PasswordRecovery from './pages/PasswordRecovery';
import profView from './pages/profView';
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
            <Route path = "/profile" element={<profView/>}/>
            <Route path = "/reset" element = {<PasswordRecovery/>}/>
            <Route path = "/explore" element = {<ExploreView/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
