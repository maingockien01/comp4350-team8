import React, { useState } from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen, { getUidCookie } from './Screens/MainScreen';
import Calendar from './Screens/Calendar';
import AddDropCourses from './Screens/AddDropCourses';
import Roadmap from './Screens/Roadmap';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

	const Index = () => {
		return (
			<div>
				{isLoggedIn ? (
					<Routes>
						<Route index={true} path="/" element={<MainScreen />} />
						<Route path="/home" element={<MainScreen />} />
						<Route path="/lookup" element={<LookUpScreen />} />
						<Route path="/courses" element={<CoursesScreen />} />
						<Route path="/add-drop" element={<AddDropCourses />} />
						<Route path="/calendar" element={<Calendar />} />
						<Route path="/roadmap" element={<Roadmap />} />
					</Routes>
				) : (
					<Routes>
						<Route
							path="/login"
							element={<LoginScreen handleLogin={handleLogin} />}
						/>
						<Route path="/signup" element={<SignupScreen />} />
					</Routes>
				)}
			</div>
		);
	};

	return (
		<div className="App">
			{isLoggedIn && <Navbar handleLogout={handleLogout} />}
			<Index />
		</div>
	);
};

export default App;
