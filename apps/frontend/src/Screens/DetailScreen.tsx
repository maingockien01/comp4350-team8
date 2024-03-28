import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {SectionDTO} from 'packages/types/dtos/section/section.dto';
import {CourseDTO} from 'packages/types/dtos/course/course.dto';
import {getTokenFromCookie} from '../Utils/CookieFunctions';
import axios from 'axios';
import CourseDetail from '../Components/CourseDetail/CourseDetail';
import {displayError} from '../Utils/Errors';

const SectionDetail =
(section: SectionDTO, handleAddSections: (sid: number) => void) => {
  return (
    <Typography key={section.sid}>
      Section ID: {section.sid} ({section.sectionName}) | Professor:{' '}
      {section.professor} | Location: {section.location.building}{' '}
      {section.location.roomNumber} | Time: {section.time} | Term:{' '}
      {section.term.season} {section.term.year}
      {/* Display add section button for current term */}
      {section.term.tid === 12 && (
        <Button onClick={() => handleAddSections(section.sid)}>
          Add section
        </Button>
      )}
    </Typography>
  );
};

const DetailScreen = () => {
  const token = getTokenFromCookie();
  const navigate = useNavigate();

  // State to store course details
  const [course, setCourse] = useState<CourseDTO>();

  const location = useLocation();
  // State to store course ID
  const [cid, setCid] = useState<number>(location.state.cid);

  useEffect(() => {
    fetchCourse(); // Fetch course details
  }, [cid]);

  // Function to handle adding sections
  const handleAddSections = async (sid: number) => {
    try {
      const response = await fetch(`/rest-api/user/add?sid=${sid}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.ok) {
        navigate('/add-drop');
      } else {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          displayError(errorData.message);
        } else {
          console.error('Failed to add section:', response.statusText);
        }
      }
    } catch (error: any) {
      displayError(error.message);
    }
  };

  // Function to fetch course details
  const fetchCourse = () => {
    console.log('fetching course');
    axios
        .get(`/rest-api/course/${cid}`)
        .then((response) => {
          setCourse(response.data); // Update state with course details
          console.log(response.data);
        })
        .catch((error: Error) => {
          displayError(error.message);
        });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{mt: 2}}>
        <Stack spacing={2}>
          {course && (
            <CourseDetail
              course={course}
              onCourseClick={(course) => {
                setCid(course.cid);
              }}
            />
          )}
          <Divider />
          <Typography variant="h5">Sections:</Typography>
          {/* Displaying sections */}
          <Stack spacing={2}>
            {course?.sections.map((section: SectionDTO) =>
              SectionDetail(section, handleAddSections))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default DetailScreen;
