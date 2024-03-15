import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Stack, Typography } from '@mui/material';

export interface CourseDetailProps {
	course: CourseDTO;
}
const CourseDetail = ({ course }: CourseDetailProps) => {
	return (
		<Stack spacing={2}>
			<Typography variant="h4">Course Name: {course.courseName}</Typography>
			<Typography variant="h6">Description: {course.description}</Typography>
			<Typography variant="h6">Department: {course.department}</Typography>
			<Typography variant="h6">Course number: {course.courseNumber}</Typography>
			<Stack direction="row" spacing={2}>
				<Typography variant="h6">Prerequisites: </Typography>
				<Typography>
					{course.prerequisites.length === 0
						? 'None'
						: course.prerequisites.map((prerequisite) => prerequisite.courseName).join(', ')}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default CourseDetail;
