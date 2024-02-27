import axios from 'axios';

export const fetchAvailableDegrees = () => {
  return axios.get('/rest-api/degree');
}

export const fetchDegreeWithRoadmap = (degreeId: number) => {
    return axios.get(`/rest-api/degree/${degreeId}?withRoadmap=true`);
}
