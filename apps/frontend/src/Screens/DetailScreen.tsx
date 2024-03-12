import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from 'apps/backend/src/entities/section.entity';
import { CourseDTO } from 'packages/types/dtos/course/course.dto';
import { getTokenFromCookie } from '../Utils/CookieFunctions';

const DetailScreen = () => {
	const token = getTokenFromCookie();
	const navigate = useNavigate();

	const [sections, setSections] = useState<Section[]>([]);
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
			}
		} catch (error) {
			console.error('Failed to add section:', error);
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
									{section.location.roomNumber} | Time: {section.time}
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
		</>
	);
};

export default DetailScreen;
