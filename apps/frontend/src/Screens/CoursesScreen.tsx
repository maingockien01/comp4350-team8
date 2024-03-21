import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';

const CoursesScreen = () => {
	const location = useLocation(); // Hook to access the current location
	const courses: CourseDTO[] = location.state.res; // Extracting courses from location state
	const navigate = useNavigate(); // Hook to access navigation functionality

	// Function to handle course click
	const handleCourseClick = (cid: number) => {
		navigate('/detail', { state: { cid } }); // Navigate to detail screen with course ID
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<div>
					{/* Map through courses and render each as a button */}
					{courses.map((course) => (
						<Button
							key={course.cid} // Key for React reconciliation
							sx={{ height: 200 }} // Styling for the button
							onClick={() => handleCourseClick(course.cid)} // Click handler to navigate to course detail
						>
							<Stack direction="row" spacing={2}>
								{' '}
								{/* Stack components to display course details */}
								<Typography>{course.cid}</Typography> {/* Displaying course ID */}
								<Typography>{course.courseName}</Typography> {/* Displaying course name */}
								<Typography>{course.courseNumber}</Typography>{' '}
								{/* Displaying course number */}
								<Typography>{course.description}</Typography>{' '}
								{/* Displaying course description */}
							</Stack>
						</Button>
					))}
				</div>
			</Container>
		</>
	);
};

export default CoursesScreen;
