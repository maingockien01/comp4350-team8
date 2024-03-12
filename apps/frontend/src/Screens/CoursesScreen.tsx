import React from 'react';
import Navbar from '../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Course } from 'apps/backend/src/entities/course.entity';

const CoursesScreen = () => {
	const location = useLocation();
	const courses: Course[] = location.state.res;
	const navigate = useNavigate();

	const handleCourseClick = (cid: number) => {
		navigate('/detail', { state: { cid } });
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<div>
					{courses.map((course) => (
						<Button
							key={course.cid}
							sx={{ height: 200 }}
							onClick={() => handleCourseClick(course.cid)}
						>
							<Stack direction="row" spacing={2}>
								<Typography>{course.cid}</Typography>
								<Typography>{course.courseName}</Typography>
								<Typography>{course.courseNumber}</Typography>
								<Typography>{course.description}</Typography>
							</Stack>
						</Button>
					))}
				</div>
			</Container>
		</>
	);
};

export default CoursesScreen;
