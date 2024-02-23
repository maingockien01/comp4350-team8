import React from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const CoursesScreen = () => {
    const location = useLocation();
    const courses = location.state.res;
    console.log(courses);

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
