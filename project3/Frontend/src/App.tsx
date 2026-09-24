import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home  from './pages/Home';
import Meetings  from './pages/Meetings';
import AddMeeting  from './pages/AddMeeting';
import EditMeeting from './pages/EditMeeting';
import About  from './pages/About';
import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/new" element={<AddMeeting />} />
        <Route path="/meetings/:meeting_id/edit" element={<EditMeeting />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
