import { Autocomplete, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CourseDTO } from "@team8/types/dtos/course/course.dto";
import { Roadmap } from "@team8/types/domain/roadmap.model";
import axios from 'axios';
import { makeAuthRequest } from "../../Utils/Request";
import CourseTree from '../../Components/CourseTree/CourseTree';


const PersonalRoadmap = () => {

    const [courses, setCourses] = useState<CourseDTO[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<CourseDTO>();
    const [doesRoadmapChange, setRoadmapChange] = useState<boolean>(false);
    const [roadmapTimestamp, setRoadmapTimestamp] = useState<number>(Date.now())
    const onRoadmapChange = (doesRoadmapChange = true) => {
        setRoadmapChange(doesRoadmapChange);
        setRoadmapTimestamp(Date.now());
    }

    const [roadmap, setRoadmap] = useState<Roadmap>(new Roadmap([])); 

    useEffect(() => {
        axios.get('/rest-api/course').then((response) => {
            setCourses(response.data);
        });
        makeAuthRequest('/rest-api/roadmap/personal').then((response) => {
            setRoadmap(new Roadmap(response.data.courses));
        }); 
    }, [])

    const addCourseToRoadmap = (course: CourseDTO) => {
        try {
            setRoadmap(roadmap.addCourse(course));
            onRoadmapChange();
        } catch (e: any) {
            alert(e.message);
        }
    }

    const removeCourseFromRoadmap = (course: CourseDTO) => {
        try {
            setRoadmap(roadmap.removeCourse(course));
            onRoadmapChange();
        } catch (e: any) {
            alert(e.messsage);
        }
    }

    const saveRoadmap = (roadmap: Roadmap) => {
        makeAuthRequest('/rest-api/roadmap/personal', 'POST', roadmap.dto).then((response) => {
            setRoadmap(new Roadmap(response.data.courses));
            onRoadmapChange(false);
        })        
        .catch((e) => {
            alert(e);
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} textAlign='center'>
                <h1>Personal roadmap</h1>
                {
                    roadmap.dto.courses.length >0 
                    ? <CourseTree courses={roadmap.dto.courses as CourseDTO[]} onRemoveCourse={removeCourseFromRoadmap} key={roadmapTimestamp}/>
                    : <p>User has empty roadmap</p>
                }
                <Button 
                    onClick={() => {
                        saveRoadmap(roadmap);
                    }}
                    variant="contained"
                    disabled={!doesRoadmapChange}
                >
                    Save
                </Button>
            </Grid>
            <Grid item xs={4}>
                <h2>Available courses</h2>
                <Autocomplete 
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select a course" />}
                    options={courses}
                    getOptionLabel={(option) => option.courseName}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.department}-{option.courseNumber} {option.courseName}
                        </Box>
                    )}
                    onChange={(event, newValue) => {
                        if(newValue) {
                            setSelectedCourse(newValue);
                        }
                    }}
                />
                <Paper>
                    <h2>{selectedCourse?.courseName}</h2>
                    <p>{selectedCourse?.description}</p> 
                    {selectedCourse?.prerequisites && 
                        <div>
                            <h3>Prerequisites</h3>
                            <ul>
                                {selectedCourse?.prerequisites.map((prerequisite: CourseDTO) => {
                                    return <li>{prerequisite.department}-{prerequisite.courseNumber} {prerequisite.courseName}</li>

                        })}
                            </ul>
                        </div>
                    }
                </Paper>   

                <Button variant="contained" onClick={() => {
                    selectedCourse && addCourseToRoadmap(selectedCourse);
                }} disabled={!selectedCourse}>
                    Add to roadmap
                </Button>
            </Grid>
        </Grid>
    )
};

export default PersonalRoadmap;