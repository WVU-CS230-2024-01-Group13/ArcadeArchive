import React from "react";
import Signup from "./content/Signup";
import ExploreView from "./content/ExploreView";
import Login from "./content/Login";
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./content/PrivateRoute";
import Navbar from "./content/Navbar";
import profView from "./content/profView";

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
                    <Route exact path='/' element={<PrivateRoute Children={profView} />} />
                  </Routes>
                </div>
              </Container>
            </AuthProvider>
          </Router>
  )
}

export default App;
