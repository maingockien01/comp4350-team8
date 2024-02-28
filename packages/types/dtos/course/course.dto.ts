import { HasPrerequisites } from "../../domain/roadmap.model";

export interface CourseDTO {
  cid: number;
  courseName: string;
  department: string;
  courseNumber: number;
  description: string;
  prerequisites: CourseDTO[];
}