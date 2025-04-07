import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Layout and component imports
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';

// Utility functions
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

// UserContext to manage logged-in user globally
import { UserContext } from '../../context/UserContext.jsx';

const Login = () => {
  // State variables for input fields and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Accessing context and router navigation
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // 🔐 If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // 🔓 Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Email and password are required!');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email!');
      return;
    }
  
    setError('');
  
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
  
      const { token, fullName, email: userEmail, profileImageUrl } = response.data;
  
      if (token) {
        localStorage.setItem('token', token);
  
        const mappedUser = {
          fullName,
          email: userEmail,
          profileImageUrl,
        };
  
        updateUser(mappedUser);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // 🖥️ UI rendering
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        {/* Show error if exists */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Login
          </button>

          {/* Link to Sign Up */}
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{' '}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
