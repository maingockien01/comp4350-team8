import {
	Alert,
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';
import { CourseDTO } from 'packages/types/dtos/course/course.dto';
import { getTokenFromCookie } from '../Utils/CookieFunctions';

const DetailScreen = () => {
	const token = getTokenFromCookie();
	const navigate = useNavigate();

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sections, setSections] = useState<SectionDTO[]>([]);
	const [prerequisite, setPrerequisite] = useState<CourseDTO[]>([]);
	const [course, setCourse] = useState<CourseDTO>();

	const location = useLocation();
	const { cid } = location.state;

	useEffect(() => {
		fetchCourse();
		fetchPrerequisites();
		fetchSections();
	}, []);

	const handleAddSections = async (sid: number) => {
		try {
			// navigate('/add-drop');
			const response = await fetch(`/rest-api/user/add?sid=${sid}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				navigate('/add-drop');
			} else {
				const errorData = await response.json();
				if (errorData && errorData.message) {
					setErrorMessage(errorData.message); // Display error message
					setOpenSnackbar(true);
				} else {
					console.error('Failed to add section:', response.statusText);
				}
			}
		} catch (error) {
			console.error('Failed to add section:', error);
			setOpenSnackbar(true);
		}
	};

	const fetchCourse = async () => {
		try {
			const response = await fetch(`/rest-api/course/one?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setCourse(data);
			} else {
				console.error('Failed to fetch sections:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch sections:', error);
		}
	};

	const fetchSections = async () => {
		try {
			const response = await fetch(`/rest-api/course/sections?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setSections(data);
			} else {
				console.error('Failed to fetch sections:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch sections:', error);
		}
	};

	const fetchPrerequisites = async () => {
		try {
			const response = await fetch(`/rest-api/course/prerequisites?cid=${cid}`);
			if (response.ok) {
				const data = await response.json();
				setPrerequisite(data);
			} else {
				console.error('Failed to fetch prerequisites:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch prerequisites:', error);
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<Stack spacing={2}>
					<Typography variant="h5">Information: </Typography>
					<Typography>Course Name: {course?.courseName}</Typography>
					<Typography>Department: {course?.department}</Typography>
					<Typography>Course number: {course?.courseNumber}</Typography>
					<Typography>Description: {course?.description}</Typography>
					<Stack direction="row" spacing={2}>
						<Typography>Prerequisites:</Typography>
						{prerequisite.map((pre) => (
							<Typography key={pre.cid}>COMP {pre.courseNumber}</Typography>
						))}
					</Stack>
					<Divider />
					<Typography variant="h5">Sections:</Typography>
					<Stack spacing={2}>
						{sections.map((section) => (
							<>
								<Typography key={section.sid}>
									Section ID: {section.sid} ({section.sectionName}) | Professor:{' '}
									{section.professor} | Location: {section.location.building}{' '}
									{section.location.roomNumber} | Time: {section.time} | Term:{' '}
									{section.term.season} {section.term.year}
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
