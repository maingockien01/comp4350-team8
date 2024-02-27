import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../css/LoginForm.css';

const LoginForm = () => {
	return (
		<div className="wrapper">
			<form action="">
				<h1>Login</h1>
				<div className="input-box">
					<input type="text" placeholder="Username" required></input>
					<PersonIcon className="icon" />
				</div>
				<div className="input-box">
					<input
						type="password"
						placeholder="Password"
						required
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
