import React, { useState } from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen, { getUidCookie } from './Screens/MainScreen';
import Calendar from './Screens/Calendar';
import AddDropCourses from './Screens/AddDropCourses';
import Roadmap from './Screens/Roadmap/Roadmap';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LookUpScreen from './Screens/LookUpScreen';
import CoursesScreen from './Screens/CoursesScreen';
import Navbar from './Components/Navbar';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const App = () => {
	const navigate = useNavigate();

	const [isLoggedIn, setLoggedIn] = useState(getUidCookie() !== undefined);

	const handleLogin = () => {
		setLoggedIn(true);
		navigate('/home');
	};

	const handleLogout = () => {
		//Should do this in backend
		document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
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
					element={isLoggedIn ? <MainScreen /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/home"
					element={isLoggedIn ? <MainScreen /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/lookup"
					element={isLoggedIn ? <LookUpScreen /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/courses"
					element={isLoggedIn ? <CoursesScreen /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/add-drop"
					element={isLoggedIn ? <AddDropCourses /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/calendar"
					element={isLoggedIn ? <Calendar /> : <Navigate to="/login" replace />}
				/>
				<Route
					path="/roadmap"
					element={isLoggedIn ? <Roadmap /> : <Navigate to="/login" replace />}
				/>
				<Route path="/login" element={<LoginScreen handleLogin={handleLogin} />} />
				<Route path="/signup" element={<SignupScreen />} />
			</Routes>
		</div>
	);
};

export default App;
