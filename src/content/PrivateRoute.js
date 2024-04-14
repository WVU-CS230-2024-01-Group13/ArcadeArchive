import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

  
export default function PrivateRoute ({Children}) {
    const currentUser = useAuth();
    let location = useLocation();
  

      return currentUser ? < Children /> : <Navigate to="/profView" state={{ from: location }} />;
  
  }  