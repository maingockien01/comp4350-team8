import { CourseDTO } from "../course/course.dto";

export interface DegreeDTO{
  did: number;
  name: string;

  recommendedCourses?: CourseDTO[];
}