import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Chart from './Pages/Chart/Chart'


const App = () => {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/chart' component={Chart} />
          </Switch>
        </div>
      </div>
    )
}

export default App;
