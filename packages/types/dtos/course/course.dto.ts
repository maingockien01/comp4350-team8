import { DepartmentDto } from './department.dto';
import { SectionDTO } from '../section/section.dto';

export interface CourseDTO {
	cid: number;
	courseNumber: number;
	courseName: string;
	department: DepartmentDto;
	description: string;
	prerequisites: CourseDTO[];
	sections: SectionDTO[];
}
