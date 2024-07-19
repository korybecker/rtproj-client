import { Route, Routes } from 'react-router';
import './App.css';
import CalendarComponent from './components/Calendar';
import Tasks from './components/Tasks';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
};

export default App;
