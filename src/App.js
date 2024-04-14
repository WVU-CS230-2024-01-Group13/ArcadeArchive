import CreatorView from './pages/CreatorView';
import Analytics from './pages/Analytics';
import PasswordRecovery from './pages/PasswordRecovery';
import profView from './pages/profView';
import profSettingsPage from './pages/profSettings';
import ExploreView from './pages/ExploreView';
import Login from './pages/Login';
import logo from './logo.svg';
import Friends from './pages/Friends';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path = "/" element={<Login/>}/> 
            <Route path = "/create" element={<CreatorView/>}/>
            <Route path = "/analytics" element={<Analytics/>}/>
            <Route path = "/profile" element={<profView/>}/>
            <Route path = "/reset" element = {<PasswordRecovery/>}/>
            <Route path = "/explore" element = {<ExploreView/>}/>
            <Route path = "/friends" element = {<Friends/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
