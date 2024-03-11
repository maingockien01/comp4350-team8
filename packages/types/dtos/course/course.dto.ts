import { HasPrerequisites } from "../../domain/roadmap.model";

export interface CourseDTO {
  cid: number;
  courseName: string;
  department: string;
  courseNumber: string;
  description: string;
  prerequisites: CourseDTO[];
}