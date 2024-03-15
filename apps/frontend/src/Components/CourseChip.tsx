import { CourseDTO } from "@team8/types/dtos/course/course.dto";
import { Chip } from "@mui/material";

export interface CourseChipProps {
	course: CourseDTO;
	onClick?: (course: CourseDTO) => void;
}
const CourseCip = (props: CourseChipProps) => {

	return (
		<Chip label={props.course.courseName} />
	)
}

export default CourseCip;