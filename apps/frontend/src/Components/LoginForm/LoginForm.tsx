import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './login.api'
import { useAuth } from '../../Providers/AuthProvider';
import { LogInResDto } from '@team8/types/dtos/auth/login.dto';

interface HandleLoginFunction {
	(): void;
}

const LoginForm = (props: { handleLogin: HandleLoginFunction }) => {
	const [formState, setFormState] = React.useState({
		username: '',
		password: '',
	});

	const auth = useAuth();
	const navigate = useNavigate();


	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Send a POST request to the backend with the form data
		login(formState.username, formState.password).then((dto: LogInResDto) => {
			// If the request is successful, store the token in the AuthProvider
			auth?.setToken(dto.access_token);
			navigate('/', { replace: true })
		}).
		catch((error) => {
			//TODO: Handle any errors that occurred during the request - show error message to user
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
						Don't have an account?{' '}
						<Link to="/signup">Register</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
