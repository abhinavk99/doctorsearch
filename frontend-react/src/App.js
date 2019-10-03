import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./screen/HomePage/HomePage";
import DoctorPage from "./screen/DoctorPage/DoctorPage";
import NavBar from "./component/NavBar/NavBar";
import DocFocused from "./screen/DocFocused/DocFocused";
import Cities from "./screen/Cities/Cities";
import CityFocused from "./screen/CityFocused/CityFocused";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ paddingTop: "1em" }}>
          <Switch>
            <Route path="/doctors/detail">
              <DocFocused />
            </Route>
            <Route path="/doctors">
              <DoctorPage />
            </Route>
            <Route path="/cities/detail">
              <CityFocused />
            </Route>
            <Route path="/cities">
              <Cities />
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
