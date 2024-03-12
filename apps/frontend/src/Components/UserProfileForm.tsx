import React from 'react';
import '../css/UserProfileForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTokenFromCookie } from '../Utils/CookieFunctions';

const UserProfileForm = () => {
	const navigate = useNavigate();

	const [formState, setFormState] = React.useState({
		username: '',
		fullName: '',
		password: '',
		confirm_pwd: '',
	});

	const labels = ['Username', 'Full Name', 'Password', 'Confirm Password'];

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const token = getTokenFromCookie();

		//Send a POST request to the backend with the form data
		if (formState.password === formState.confirm_pwd) {
			try {
				const res = await axios.post('rest-api/profile', formState, {
					headers: { Authorization: 'Bearer ' + token },
				});
				// Handle the response from the backend
				if (res.data.status === 'success') {
					toast.success(res.data.message);
				} else {
					toast.error(res.data.message);
				}
			} catch (error) {
				// Handle any errors that occurred during the request
				console.error(error);
			}
		} else {
			toast.error('Confirm Password must match Password!');
		}
	};

	return (
		<div className="profile-wrapper">
			<form onSubmit={handleSubmit}>
				<h1>User Profile</h1>
				{Object.entries(formState).map(([name, value], index) => (
					<div className="profile-input-box">
						<h3 className="profile-label">{labels[index]}</h3>
						<input
							type="text"
							name={name}
							aria-label={labels[index]}
							onChange={handleChange}
							value={value}
						></input>
					</div>
				))}

				<button type="submit">Update</button>
				<ToastContainer autoClose={2000} closeOnClick />
			</form>
		</div>
	);
};

export default UserProfileForm;
