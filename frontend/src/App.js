import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/jobs">Job Listings</a></li>
            <li><a href="/history">Application History</a></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/jobs" component={JobListings} />
          <Route path="/history" component={ApplicationHistory} />
          <Route path="/" exact component={JobListings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
