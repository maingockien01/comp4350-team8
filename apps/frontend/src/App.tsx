import React, { useState } from 'react';
import './App.css';
import Routes from './Components/Routes';
import AuthProvider from './Providers/AuthProvider';
import ProtectedNavbar from './Components/ProtectedNavbar';

const App = () => {

	return (
		<div className="App">
			{/* <AuthProvider>
				<ProtectedNavbar />
				<Routes />
			</AuthProvider> */}
			
		</div>
	);
};

export default App;
