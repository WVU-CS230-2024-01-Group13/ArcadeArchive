import React from "react";
import Signup from "./content/Signup";
import ExploreView from "./content/ExploreView";
import Login from "./content/Login";
import MessagingComponent from "./content/messaging_component.js";
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./content/PrivateRoute";
import Navbar from "./content/Navbar";
import Friends from "./content/Friends.jsx"
import CreatorView from "./content/CreatorView.js"
import Analytics from "./content/Analytics.js"
import profView from "./content/profView.js"
import PasswordRecovery from "./content/PasswordRecovery.jsx"

function App() {
  return (
          <Router>
             <Navbar />
            <AuthProvider>
              <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='w-100' style={{ maxWidth: "400px" }}>
                  <Routes>
                    <Route path='/signup' element={<Signup />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path ='/explore' element = {<ExploreView/>}/>
                    <Route path ='/analytics' element = {<Analytics/>}/>
                    <Route path='/social' element={<MessagingComponent />}/>
                    <Route path ='/friends' element = {<Friends/>}/>
                    <Route path = '/create' element = {<CreatorView/>}/>
                    <Route path = '/profile' element = {<profView/>}/>
                    <Route path = '/reset' element = {<PasswordRecovery/>}/>
                    <Route exact path='/' element={<PrivateRoute Children={Login} />} />
                  </Routes>
                </div>
              </Container>
            </AuthProvider>
          </Router>
  )
}

export default App;
