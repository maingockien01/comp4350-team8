import React, {useEffect, useState} from 'react';
import './App.css';
import MainScreen from './Screens/MainScreen';
import Calendar from './Screens/Calendar/Calendar';
import AddDropCourses from './Screens/AddDropCourses';
import Roadmap from './Screens/Roadmap/Roadmap';
import PersonalizedRoadmap
  from './Screens/PersonalizedRoadmap/PersonalizedRoadmap';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import LookUpScreen from './Screens/LookUpScreen';
import CoursesScreen from './Screens/CoursesScreen';
import Navbar from './Components/Navbar';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import DetailScreen from './Screens/DetailScreen';
import {getTokenFromCookie} from './Utils/CookieFunctions';
import UserProfileScreen from './Screens/UserProfileScreen';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(
      getTokenFromCookie() !== undefined,
  );

  useEffect(() => {
    if (
      isLoggedIn &&
      (window.location.pathname === '/login' ||
        window.location.pathname === '/signup')
    ) {
      navigate('/home');
    }
    if (
      !isLoggedIn &&
      (window.location.pathname === '/home' ||
        window.location.pathname === '/lookup' ||
        window.location.pathname === '/courses' ||
        window.location.pathname === '/detail' ||
        window.location.pathname === '/add-drop' ||
        window.location.pathname === '/calendar' ||
        window.location.pathname === '/roadmap' ||
        window.location.pathname === '/profile')
    ) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/home');
  };

  const handleLogout = () => {
    // Should do this in backend
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      {isLoggedIn && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route
          index={true}
          path="/"
          element={
            isLoggedIn ? <MainScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <MainScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/lookup"
          element={
            isLoggedIn ? <LookUpScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses"
          element={
            isLoggedIn ? <CoursesScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/detail"
          element={
            isLoggedIn ? <DetailScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-drop"
          element={
            isLoggedIn ? <AddDropCourses /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/calendar"
          element={isLoggedIn ? <Calendar /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/roadmap"
          element={isLoggedIn ? <Roadmap /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <UserProfileScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/roadmap/personal"
          element={
            isLoggedIn ? (
              <PersonalizedRoadmap />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginScreen handleLogin={handleLogin} />}
        />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </div>
  );
};

export default App;
