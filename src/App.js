import React from 'react';

import logo from './logo.svg';
import twitch from './twitch.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import './App.css';
import Auth from './components/Auth';

import Streams from './components/Streams';
import Games from './components/Games';
import Header from './components/Header';
import GameStreams from './components/GameStreams';


function App() {
  return (
    <Router>
      <Auth />

  
      <div className="App">
        <div className='logos-container'>
          <img src={logo} alt="logo" className="logo"/>
          <img src={twitch} alt="logo" className="logo"/>
        </div>
        


        <Header />
        {/* <Counter /> */}
        {/* <Uploader /> */}
        
        <Route exact path='/' component={Games} />
        <Route exact path='/top-games' component={Games} />
        <Route exact path='/top-streams' component={Streams} />
        <Route exact path='/game/:id' component={GameStreams} />
      </div>
    </Router>
    
  );
}

export default App;
