import {NavLink} from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/meetings">Meetings</NavLink>
      <NavLink to="/meetings/new">New Meeting</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}