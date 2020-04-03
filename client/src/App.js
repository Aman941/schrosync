import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './component/Join'
import Youtubeplayer from './component/Youtubeplayer'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component = {Youtubeplayer} />
    </Router>
  );
}

export default App;
