import React from "react";
import Signup from "./content/Signup";
import ExploreView from "./content/ExploreView";
import Login from "./content/Login";
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./content/PrivateRoute";
import Navbar from "./content/Navbar";
import Friends from "./content/Friends.jsx"
import CreatorView from "./content/CreatorView.js"
import Analytics from "./content/Analytics.js"
import ProfView from "./content/profView.js";
import ProfSettingsPage from "./content/profSettings.js";
import profView from "./content/profView.js"
import PasswordRecovery from "./content/PasswordRecovery.jsx"
import Chat from "./content/messaging_component.js";


function App() {
  return (
    <Router>
      <Navbar />
      <AuthProvider>
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
          <div className='w-100' style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              
              <Route exact path='/' element={<PrivateRoute />}>
                <Route path='/' element={<ExploreView />} />
              </Route>

              <Route exact path='/social' element={<PrivateRoute />}>
                <Route path='/social' element={<Chat />} />
              </Route>

              <Route exact path='/friends' element={<PrivateRoute />}>
                <Route path='/friends' element={<Friends />} />
              </Route>
              /*Need to redirect user to explore view if not a creator account on /create and /analytics */
              <Route exact path='/create' element={<PrivateRoute />}>
                <Route path='/create' element={<CreatorView />} />
              </Route>
             
              <Route exact path='/analytics' element={<PrivateRoute />}>
                <Route path='/analytics' element={<Analytics />} />
              </Route>

              <Route exact path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<ProfView />} />
              </Route>

              <Route exact path='/profile/settings' element={<PrivateRoute />}>
                <Route path='/profile/settings' element={<ProfSettingsPage />} />
              </Route>

              <Route path = '/reset' element = {<PasswordRecovery/>}/>
              </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  )
}

export default App;
