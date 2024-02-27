import React from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen from './Screens/MainScreen';
import Calendar from './Screens/Calendar';
import AddDropCourses from './Screens/AddDropCourses';
import CoursesLookUp from './Screens/CoursesLookUp';
import Roadmap from './Screens/Roadmap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LookUpScreen from './Screens/LookUpScreen';
import CoursesScreen from './Screens/CoursesScreen';
import LoginScreen from './Screens/LoginScreen';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route index={true} path="/" element={<MainScreen />} />
					<Route path="/lookup" element={<LookUpScreen />} />
					<Route path="/courses" element={<CoursesScreen />} />
					<Route
						path="/rest-api/auth/login"
						element={<LoginScreen />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
