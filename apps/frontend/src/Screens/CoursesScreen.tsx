import React from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

interface Course {
    cid: number;
    courseName: string;
    courseNumber: string;
    description: string;
    // Add other properties as needed
  }
  
const CoursesScreen = () => {
    const location = useLocation();
    const courses: Course[] = location.state.res;

    return (
        <>
        <Navbar/>
        <Container maxWidth="lg" sx={{mt: 2}}>
            <div>
                {courses.map((course) => (
                    <Button sx={{height:200}}>
                        <Stack direction="row" spacing={2}>
                            <Typography>{course.cid}</Typography>
                            <Typography>{course.courseName}</Typography>
                            <Typography>{course.courseNumber}</Typography>
                            <Typography>{course.description}</Typography>
                        </Stack>
                    </Button>
                ))}
            </div>
        </Container>
        </>
    );
};

export default CoursesScreen;
