import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Stack, Typography } from '@mui/material';
import CourseChip from '../CourseChip';

export interface CourseDetailProps {
	course: CourseDTO;
	onCourseClick?: (course: CourseDTO) => void;
	onCourseDelete?: (course: CourseDTO) => void;
}
const CourseDetail = (props: CourseDetailProps) => {
	const course = props.course;
	return (
		<Stack spacing={2}>
			<Typography variant="h4">Course Name: {course.courseName}</Typography>
			<Typography variant="h6">Description: {course.description}</Typography>
			<Typography variant="h6">Department: {course.department.name}</Typography>
			<Typography variant="h6">Course number: {course.courseNumber}</Typography>
			<Stack direction="row" spacing={2}>
				<Typography variant="h6">Prerequisites: </Typography>
				<Typography>
					{course.prerequisites.length === 0
						? 'None'
						: course.prerequisites.map((prerequisite: CourseDTO) => (
							<CourseChip key={prerequisite.cid} course={prerequisite} onChipClick={props.onCourseClick} onChipDelete={props.onCourseDelete} />
						  )
						)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default CourseDetail;
