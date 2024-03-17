import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import axios from 'axios';

export function getCourse(cid: number): Promise<CourseDTO> {
	const courseUrl = new URL(`/rest-api/course/${cid}`, window.location.origin);

	return axios.get(courseUrl.toString()).then((response) => response.data);
}

export function getCourses(searchParams: {
	termId?: number;
	departmentId?: number;
} = {}): Promise<CourseDTO[]> {
	const coursesUrl = new URL('/rest-api/course', window.location.origin);
	if (searchParams.termId) {
		coursesUrl.searchParams.append('termId', searchParams.termId.toString());
	}
	if (searchParams.departmentId) {
		coursesUrl.searchParams.append('departmentId', searchParams.departmentId.toString());
	}

	return axios.get(coursesUrl.toString()).then((response) => response.data);
}