export interface CourseDTO {
	cid: number;
	courseNumber: number;
	courseName: string;
	department: string;
	description: string;
	prerequisites: CourseDTO[];
}
