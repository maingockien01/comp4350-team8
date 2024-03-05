import React from 'react';
import LoginForm from '../Components/LoginForm/LoginForm';
import '../css/LoginScreen.css';

interface HandleLoginFunction {
	(): void;
}

const LoginScreen = () => {
	
	const handleLogin = () => {

	}
	
	return (
		<div className="LoginScreen">
			<LoginForm handleLogin={handleLogin} />
		</div>
	);
};

export default LoginScreen;
