import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css';
import Counter from './components/counter';
import Counters from './components/counters';
import Home from './components/home';
import About from './components/about';
import Contactus from './components/contactus';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Link to=""> Home </Link>
      <Link to="/about"> About </Link>
      <Link to="/contactus"> Contact Us </Link>
    </>
  );
}

export default App;
