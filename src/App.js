import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.scss';

import Header from './components/header';
import Jobs from './components/jobs';
import Notification from './components/Notification';
import Floating from './components/Floating';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/" element={<Jobs />} /> Default route
        </Routes>
      </main>
      <Floating />
    </Router>
  );
};

export default App;
