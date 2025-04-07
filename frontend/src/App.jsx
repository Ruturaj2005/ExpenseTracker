import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider, { UserContext } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import {Toaster} from "react-hot-toast";

const AppRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <SignUp />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/income"
        element={
          <PrivateRoute>
            <Income />
          </PrivateRoute>
        }
      />
      <Route
        path="/expense"
        element={
          <PrivateRoute>
            <Expense />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: '13px'
            },
          }}
        />
    </UserProvider>
  );
};

export default App;
