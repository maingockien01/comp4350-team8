import React from 'react';
import './App.css';
import { APPS_NAME } from '@team8/constants/apps';
import MainScreen from './Screens/MainScreen'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
	<>
		<Router>
			<Routes>
				<Route index={true} path='/' element={<MainScreen/>}/>
			</Routes>
		</Router>
	</>
  );
};

export default App;

