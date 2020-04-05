import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './component/Join'
import PlayerHook from './component/PlayerHook'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component = {PlayerHook} />
    </Router>
  );
}

export default App;
