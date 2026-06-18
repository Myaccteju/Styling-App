import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Authform from './Pages/Authform';
import Dashboard from './Pages/Dashboard';
import { auth } from './firebaseauth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
    return() => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"}/>}/>
        <Route path="/login" element={user ? <Navigate to="/dashboard"/> : <Authform/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to = "/login"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
