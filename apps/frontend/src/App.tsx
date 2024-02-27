import React from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen from './Screens/MainScreen';
import Calendar from "./Screens/Calendar";
import AddDropCourses from './Screens/AddDropCourses';
import CoursesLookUp from './Screens/CoursesLookUp';
import Roadmap from './Screens/Roadmap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LookUpScreen from './Screens/LookUpScreen';
import CoursesScreen from './Screens/CoursesScreen';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route index={true} path="/" element={<MainScreen />} />
					<Route path="/lookup" element={<LookUpScreen />}/>
					<Route path='/courses' element={<CoursesScreen/>}/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
