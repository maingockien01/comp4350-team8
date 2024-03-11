export interface CourseDTO {
	cid: number;
	courseNumber: string;
	courseName: string;
	department: string;
	description: string;
	prerequisites: CourseDTO[];
}
