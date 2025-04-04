import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedView from './views/ProtectedView';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedView user={user} requiredRoles={['admin', 'user']}>
          <Route path="/dashboard" component={Dashboard} />
        </ProtectedView>
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
