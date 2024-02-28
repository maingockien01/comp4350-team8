import React from 'react';
import LoginForm from '../Components/LoginForm';
import '../css/LoginScreen.css';

interface HandleLoginFunction {
	(): void;
}

const LoginScreen = (props: { handleLogin: HandleLoginFunction }) => {
	return (
		<div className="LoginScreen">
			<LoginForm handleLogin={props.handleLogin} />
		</div>
	);
};

export default LoginScreen;
