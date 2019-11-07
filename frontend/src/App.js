import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './screen/HomePage/HomePage';
import Doctors from './screen/Doctors/Doctors';
import NavBar from './component/NavBar/NavBar';
import DocFocused from './screen/DocFocused/DocFocused';
import Cities from './screen/Cities/Cities';
import CityFocused from './screen/CityFocused/CityFocused';
import Specialties from './screen/Specialties/Specialties';
import SpecFocused from './screen/SpecFocused/SpecFocused';
import About from './screen/About/About';
import Search from './screen/Search/Search';

function App() {
  require('dotenv').config();
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ paddingTop: '1em' }}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/doctors/:id">
              <DocFocused />
            </Route>
            <Route path="/doctors">
              <Doctors />
            </Route>
            <Route path="/cities/:id">
              <CityFocused />
            </Route>
            <Route path="/cities">
              <Cities />
            </Route>
            <Route path="/specialties/:id">
              <SpecFocused />
            </Route>
            <Route path="/specialties">
              <Specialties />
            </Route>
            <Route path="/search/:queryStr">
              <Search />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
