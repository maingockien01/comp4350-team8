import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, Stack, Typography} from '@mui/material';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';

const CoursesScreen = () => {
  // Hook to access the current location
  const location = useLocation();
  // Extracting courses from location state
  const courses: CourseDTO[] = location.state.res;
  // Hook to access navigation functionality
  const navigate = useNavigate();

  /**
   * Handles the click event when a course is clicked.
   * @param {number} cid - The course ID
   */
  const handleCourseClick = (cid: number) => {
    navigate('/detail', {state: {cid}});
  };

  return (
    <>
      <Container maxWidth="lg" sx={{mt: 2}}>
        <div>
          {/* Map through courses and render each as a button */}
          {courses.map((course) => (
            <Button
              key={course.cid}
              sx={{height: 200}}
              onClick={() => handleCourseClick(course.cid)}
            >
              <Stack direction="row" spacing={2}>
                {' '}
                <Typography>{course.cid}</Typography>{' '}
                <Typography>{course.courseName}</Typography>{' '}
                <Typography>{course.courseNumber}</Typography>{' '}
                <Typography>{course.description}</Typography>{' '}
              </Stack>
            </Button>
          ))}
        </div>
      </Container>
    </>
  );
};

export default CoursesScreen;
