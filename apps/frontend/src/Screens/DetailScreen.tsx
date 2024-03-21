import { Alert, Button, Container, Divider, Snackbar, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';
import { CourseDTO } from 'packages/types/dtos/course/course.dto';
import { getTokenFromCookie } from '../Utils/CookieFunctions';
import axios from 'axios';
import CourseDetail from '../Components/CourseDetail/CourseDetail';

const DetailScreen = () => {
	const token = getTokenFromCookie();
	const navigate = useNavigate();


	const [openSnackbar, setOpenSnackbar] = useState(false); // State to control snackbar visibility
	const [errorMessage, setErrorMessage] = useState(''); // State to store error message
	const [course, setCourse] = useState<CourseDTO>(); // State to store course details

	const location = useLocation();
	const [cid, setCid] = useState<number>(location.state.cid); // State to store course ID

	useEffect(() => {
		fetchCourse(); // Fetch course details
	}, [cid]);

	// Function to handle adding sections
	const handleAddSections = async (sid: number) => {
		try {
			const response = await fetch(`/rest-api/user/add?sid=${sid}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				navigate('/add-drop'); // Redirect to add-drop screen after successful addition
			} else {
				const errorData = await response.json();
				if (errorData && errorData.message) {
					setErrorMessage(errorData.message); // Set error message
					setOpenSnackbar(true); // Open snackbar to display error message
				} else {
					console.error('Failed to add section:', response.statusText);
				}
			}
		} catch (error) {
			console.error('Failed to add section:', error);
			setOpenSnackbar(true); // Open snackbar to display error message
		}
	};

	// Function to fetch course details
	const fetchCourse = () => {
		console.log('fetching course');
		axios.get(`/rest-api/course/${cid}`)
			.then((response) => {
				setCourse(response.data); // Update state with course details
				console.log(response.data);
			})
			.catch((error: Error) => {
				alert(error.message); // Display error message
				setErrorMessage(error.message); // Set error message
			});
	};

	// Function to handle closing snackbar
	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<Stack spacing={2}>
					{ course && <CourseDetail course={course} onCourseClick={(course) => {
						setCid(course.cid)
					}}/> }
					<Divider />
					<Typography variant="h5">Sections:</Typography>
					{/* Displaying sections */}
					<Stack spacing={2}>
						{course?.sections.map((section: SectionDTO) => (
							<>
								<Typography key={section.sid}>
									Section ID: {section.sid} ({section.sectionName}) | Professor:{' '}
									{section.professor} | Location: {section.location.building}{' '}
									{section.location.roomNumber} | Time: {section.time} | Term:{' '}
									{section.term.season} {section.term.year}
									{/* Display add section button for current term */}
									{section.term.tid === 12 && (
										<Button onClick={() => handleAddSections(section.sid)}>
											Add section
										</Button>
									)}
								</Typography>
							</>
						))}
					</Stack>
				</Stack>
			</Container>
			{/* TODO: make error display global or available in all screens */}
			{/* Snackbar to display error message */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000} // Adjust duration as needed
				onClose={handleCloseSnackbar}
			>
				<Alert elevation={6} variant="filled" severity="error" onClose={handleCloseSnackbar}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default DetailScreen;
