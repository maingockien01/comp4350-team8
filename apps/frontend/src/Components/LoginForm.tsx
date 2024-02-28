import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../css/LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
	const [formState, setFormState] = React.useState({
		username: '',
		password: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Send a POST request to the backend with the form data
		axios
			.post('http://localhost:3000/rest-api/auth/login', formState)
			.then((response) => {
				// Handle the response from the backend
				console.log(response);
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error(error);
			});
	};

	return (
		<div className="wrapper">
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<div className="input-box">
					<input
						type="text"
						name="username"
						placeholder="Username"
						required
						onChange={handleChange}
						value={formState.username}
					></input>
					<PersonIcon className="icon" />
				</div>
				<div className="input-box">
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						onChange={handleChange}
						value={formState.password}
					></input>
					<LockOutlinedIcon className="icon" />
				</div>

				<div className="remember-forgot">
					<label>
						<input type="checkbox" />
						Remember me
					</label>
					<a href="#">Forgot password?</a>
				</div>

				<button type="submit">Login</button>

				<div className="register-link">
					<p>
						Don't have an account? <a href="#">Register</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
