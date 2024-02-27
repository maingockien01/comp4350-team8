import React, { useState } from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen from './Screens/MainScreen';
import Calendar from './Screens/Calendar';
import AddDropCourses from './Screens/AddDropCourses';
import Roadmap from './Screens/Roadmap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LookUpScreen from './Screens/LookUpScreen';
import CoursesScreen from './Screens/CoursesScreen';
import Navbar from './Components/Navbar';
import LoginScreen from './Screens/LoginScreen';

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(true);

	const Index = () => {
		return (
			<div>
				{isLoggedIn ? (
					<Routes>
						<Route index={true} path="/" element={<MainScreen />} />
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
							//path="/rest-api/auth/login"
							element={<LoginScreen />}
						/>
					</Routes>
				)}
			</div>
		);
	};

	return (
		<div className="App">
			<Navbar />
			<Index />
		</div>
	);
};

export default App;
