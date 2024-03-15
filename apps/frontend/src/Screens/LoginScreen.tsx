import React from 'react';
import LoginForm from '../Components/LoginForm';
import '../css/LoginScreen.css';
import { ToastContainer } from 'react-toastify';

interface HandleLoginFunction {
	(): void;
}

const LoginScreen = (props: { handleLogin: HandleLoginFunction }) => {
	return (
		<div className="LoginScreen">
			<LoginForm handleLogin={props.handleLogin} />
			<ToastContainer autoClose={2000} closeOnClick pauseOnFocusLoss={false} />
		</div>
	);
};

export default LoginScreen;
