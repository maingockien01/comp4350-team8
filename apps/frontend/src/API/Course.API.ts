import {CourseDTO} from '@team8/types/dtos/course/course.dto';
import axios from 'axios';

/**
 * Retrieves a specific course by its ID.
 * @param {number} cid - The ID of the course to retrieve.
 * @return {Promise<CourseDTO>}
 * A Promise that resolves to the CourseDTO object representing the course.
 */
export function getCourse(cid: number): Promise<CourseDTO> {
  const courseUrl = new URL(`/rest-api/course/${cid}`, window.location.origin);

  return axios.get(courseUrl.toString()).then((response) => response.data);
}

/**
 * Retrieves a list of courses based on the specified search parameters.
 * @param {Object} searchParams
 * An optional object containing search parameters.
 * @param {number} searchParams.termId
 * The ID of the term to filter courses by.
 * @param {number} searchParams.departmentId
 * The ID of the department to filter courses by.
 * @return {Promise<CourseDTO[]>}
 * A Promise to an array of CourseDTO objects representing the courses.
 */
export function getCourses(
    searchParams: {
    termId?: number;
    departmentId?: number;
  } = {},
): Promise<CourseDTO[]> {
  const coursesUrl = new URL('/rest-api/course', window.location.origin);
  if (searchParams.termId) {
    coursesUrl.searchParams.append('termId', searchParams.termId.toString());
  }
  if (searchParams.departmentId) {
    coursesUrl.searchParams.append(
        'departmentId',
        searchParams.departmentId.toString(),
    );
  }

  return axios.get(coursesUrl.toString()).then((response) => response.data);
}
