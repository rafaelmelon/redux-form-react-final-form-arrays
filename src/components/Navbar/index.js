import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/"><img src={logo} width="30" height="30" alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/redux-form">redux-form</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/react-final-form">react-final-form</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
