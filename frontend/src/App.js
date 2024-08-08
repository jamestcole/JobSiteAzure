import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import JobListings from './components/JobListings';
import ApplicationHistory from './components/ApplicationHistory';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/jobs">Job Listings</Link></li>
            <li><Link to="/history">Application History</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/history" element={<ApplicationHistory />} />
          <Route path="/" element={<JobListings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
