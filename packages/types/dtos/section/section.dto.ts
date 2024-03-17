import { CourseDTO } from '../course/course.dto';
import { LocationDTO } from '../location/location.dto';
import { TermDTO } from '../term/term.dto';

export interface SectionDTO {
	sid: number;
	sectionName: string;
	time: string;
	professor: string;
	course: CourseDTO;
	location: LocationDTO;
	term: TermDTO;
}
