import './App.css'
import Header from './components/header'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Robot from './pages/robot';
import Flasher from './pages/flasher';
import Unsupported from './pages/unsupported';
import { useEffect } from 'react';


function App() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!('serial' in navigator)) {
      navigate('/unsupported', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/robot" element={<Robot />} />
        <Route path="/flash" element={<Flasher />} />
        <Route path="/unsupported" element={<Unsupported />} />
        <Route path="*" element={<Navigate to="/robot" replace />} />
      </Routes>
    </>
  )
}

export default App
