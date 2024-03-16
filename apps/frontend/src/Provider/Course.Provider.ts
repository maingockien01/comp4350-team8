import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import axios from 'axios';

export function getCourse(cid: number): Promise<CourseDTO> {
	return axios.get(`/rest-api/course/${cid}`).then((response) => response.data);
}