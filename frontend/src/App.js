import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from './components/pages/Main/main';
import Dashboard from "./components/pages/Dashboard/dashboard";
import Mymeet from "./components/pages/MyMeet/Mymeet";
import Back from './components/pages/backup';
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
        <Route path="/Mymeet" element={<Mymeet />}/>
        <Route path='/Back' element={<Back/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
