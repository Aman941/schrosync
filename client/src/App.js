import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './component/Join'
import Player from './component/Player'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component = {Player} />
    </Router>
  );
}

export default App;
