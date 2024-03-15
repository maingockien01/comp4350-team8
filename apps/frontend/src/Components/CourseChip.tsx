import { CourseDTO } from "@team8/types/dtos/course/course.dto";
import { Chip } from "@mui/material";

export interface CourseChipProps {
	course: CourseDTO;
	onChipClick?: (course: CourseDTO) => void;
	onChipDelete?: (course: CourseDTO) => void;
}
const CourseCip = (props: CourseChipProps) => {

	const course = props.course;

	return ({
		onChipDelete
		? <Chip label={`${course.deparment.name} ${course.courseNumber} ${course.courseName}`} onClick={() => props.onChipClick(course)} />
		: <Chip label={`${course.deparment.name} ${course.courseNumber} ${course.courseName}`} onClick={() => props.onChipClick(course)} onDelete={() => props.onChipDelete(course)} />
	})
}

export default CourseCip;