import React from 'react';
import '../css/SignupScreen.css';
import SignupForm from '../Components/SignupForm';
import { ToastContainer, toast } from 'react-toastify';

const SignupScreen = () => {
	return (
		<div className="SignupScreen">
			<SignupForm />
			<ToastContainer autoClose={2000} closeOnClick pauseOnFocusLoss={false} theme="dark" />
		</div>
	);
};

export default SignupScreen;
