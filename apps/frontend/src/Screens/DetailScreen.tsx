import { Alert, Button, Container, Divider, Snackbar, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';
import { CourseDTO } from 'packages/types/dtos/course/course.dto';
import { getTokenFromCookie } from '../Utils/CookieFunctions';

const DetailScreen = () => {
	const token = getTokenFromCookie();
	const navigate = useNavigate();

	const [openSnackbar, setOpenSnackbar] = useState(false); // State to control snackbar visibility
	const [errorMessage, setErrorMessage] = useState(''); // State to store error message
	const [sections, setSections] = useState<SectionDTO[]>([]); // State to store sections
	const [prerequisite, setPrerequisite] = useState<CourseDTO[]>([]); // State to store prerequisites
	const [course, setCourse] = useState<CourseDTO>(); // State to store course details

	const location = useLocation();
	const { cid } = location.state;

	useEffect(() => {
		fetchCourse(); // Fetch course details
		fetchPrerequisites(); // Fetch prerequisites
		fetchSections(); // Fetch sections
	}, []);

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
	const fetchCourse = async () => {
		try {
			const response = await fetch(`/rest-api/course/one?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setCourse(data); // Update state with course details
			} else {
				console.error('Failed to fetch sections:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch sections:', error);
		}
	};

	// Function to fetch sections
	const fetchSections = async () => {
		try {
			const response = await fetch(`/rest-api/course/sections?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setSections(data); // Update state with sections
			} else {
				console.error('Failed to fetch sections:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch sections:', error);
		}
	};

	// Function to fetch prerequisites
	const fetchPrerequisites = async () => {
		try {
			const response = await fetch(`/rest-api/course/prerequisites?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setPrerequisite(data); // Update state with prerequisites
			} else {
				console.error('Failed to fetch prerequisites:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch prerequisites:', error);
		}
	};

	// Function to handle closing snackbar
	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<Stack spacing={2}>
					<Typography variant="h5">Information: </Typography>
					{/* Displaying course details */}
					//TODO: Could extract this to be Course Detail Component
					<Typography>Course Name: {course?.courseName}</Typography>
					<Typography>Department: {course?.department}</Typography>
					<Typography>Course number: {course?.courseNumber}</Typography>
					<Typography>Description: {course?.description}</Typography>
					{/* Displaying prerequisites */}
					<Stack direction="row" spacing={2}>
						<Typography>Prerequisites:</Typography>
						{prerequisite.map((pre) => (

							<Typography key={pre.cid}>
								{pre.department.slice(0, 4)} {pre.courseNumber}
							</Typography>

						))}
					</Stack>
					<Divider />
					<Typography variant="h5">Sections:</Typography>
					{/* Displaying sections */}
					<Stack spacing={2}>
						{sections.map((section) => (
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
