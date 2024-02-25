import React from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen from './Screens/MainScreen';
import Calendar from "./Screens/Calendar";
import AddDropCourses from './Screens/AddDropCourses';
import CoursesLookUp from './Screens/CoursesLookUp';
import Roadmap from './Screens/Roadmap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<MainScreen />}/>
				<Route path='/courses-look-up' element={<CoursesLookUp />}/>
				<Route path='/add-drop-courses' element={<AddDropCourses />}/>
				<Route path='/calendar' element={<Calendar />}/>
				<Route path='/roadmap' element={<Roadmap />}/>
			</Routes>
		</>
	);
};

export default App;
