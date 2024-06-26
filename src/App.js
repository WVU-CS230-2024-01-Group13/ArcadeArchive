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
import Analytics from "./content/Analytics.jsx"
import ProfView from "./content/profView.js";
import ProfSettingsPage from "./content/profSettings.js";
import PasswordRecovery from "./content/PasswordRecovery.jsx"
import GameDetailsView from "./content/GameDetailsView.js";
import UpdateGame from "./content/UpdateGame.js";
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
              
              <Route element={<PrivateRoute />}>
                <Route path='/' element={<ExploreView />} />
                <Route path='/game/:id' element={<GameDetailsView />} />
                <Route path="/update-game/:id" element={<UpdateGame />} />
                <Route path='/social' element={<Chat />} />
                <Route path='/friends' element={<Friends />} />

                /*Need to redirect user to explore view if not a creator account on /create and /analytics */
                <Route path='/create' element={<CreatorView />} />
                <Route path='/analytics' element={<Analytics />} />

                <Route path='/profile' element={<ProfView />} />
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
