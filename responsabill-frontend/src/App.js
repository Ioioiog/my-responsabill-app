import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Analytics from './components/Analytics';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/analytics" component={Analytics} />
      </Switch>
    </Router>
  );
};

export default App;
