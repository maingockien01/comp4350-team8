import {CourseDTO} from '@team8/types/dtos/course/course.dto';
import {Chip} from '@mui/material';

export interface CourseChipProps {
  course: CourseDTO;
  onChipClick?: (course: CourseDTO) => void;
  onChipDelete?: (course: CourseDTO) => void;
}
const CourseCip = (props: CourseChipProps) => {
  const course = props.course;
  const label =
  `${course.department.name} ${course.courseNumber} ${course.courseName}`;
  const isDeletable = !!props.onChipDelete;

  return isDeletable ? (
    <Chip
      label={label}
      onClick={() => props.onChipClick && props.onChipClick(course)}
      onDelete={() => props.onChipDelete && props.onChipDelete(course)}
    />
  ) : (
    <Chip
      label={label}
      onClick={() => props.onChipClick && props.onChipClick(course)}
    />
  );
};

export default CourseCip;
