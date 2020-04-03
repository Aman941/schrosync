import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './component/Join'
import Player from './component/player'

function App() {
  return (
    <Router>
      <Route path="/" extract component={Join} />
      <Route path="/chat" component = {Player} />
    </Router>
  );
}

export default App;
