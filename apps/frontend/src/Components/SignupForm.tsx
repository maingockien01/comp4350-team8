import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import '../css/SignupForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
	const navigate = useNavigate();

	const [formState, setFormState] = React.useState({
		username: '',
		fullName: '',
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
			.post('rest-api/auth/signup', formState)
			.then((response) => {
				// Handle the response from the backend
				if (response.data.status == 'success') {
					navigate('/login');
				}
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error(error);
			});
	};

	return (
		<div className="wrapper">
			<form onSubmit={handleSubmit}>
				<h1>Signup</h1>
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
						type="text"
						name="fullName"
						placeholder="Full Name"
						required
						onChange={handleChange}
						value={formState.fullName}
					></input>
					<DriveFileRenameOutlineOutlinedIcon className="icon" />
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

				<button type="submit">Signup</button>
			</form>
		</div>
	);
};

export default SignupForm;
