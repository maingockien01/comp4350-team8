import { Autocomplete, Box, Button, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Roadmap } from '@team8/types/domain/roadmap.model';
import axios from 'axios';
import { makeAuthRequest } from '../../Utils/Request';
import CourseTree from '../../Components/CourseTree/CourseTree';
import CourseDetail from '../../Components/CourseDetail/CourseDetail';
import { getCourse, getCourses } from '../../API/Course.API';

const PersonalRoadmap = () => {
	const [courses, setCourses] = useState<CourseDTO[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<CourseDTO>();
	const [doesRoadmapChange, setRoadmapChange] = useState<boolean>(false);
	const [roadmapTimestamp, setRoadmapTimestamp] = useState<number>(Date.now());
	const onRoadmapChange = (doesRoadmapChange = true) => {
		setRoadmapChange(doesRoadmapChange);
		setRoadmapTimestamp(Date.now());
	};

	const [roadmap, setRoadmap] = useState<Roadmap>(new Roadmap([]));

	useEffect(() => {
		getCourses().then((data) => {
			setCourses(data);
		});
		makeAuthRequest('/rest-api/roadmap/personal').then((response) => {
			setRoadmap(new Roadmap(response.data.courses));
		});
	}, []);

	const onSelectedCourseChange = (cid: number) => {
		if (cid === selectedCourse?.cid) {
			return;
		}

		getCourse(cid).then((course) => {
			setSelectedCourse(course);
		});
	};

	const addCourseToRoadmap = (course: CourseDTO) => {
		try {
			setRoadmap(roadmap.addCourse(course));
			onRoadmapChange();
		} catch (e: any) {
			alert(e.message);
		}
	};

	const removeCourseFromRoadmap = (course: CourseDTO) => {
		try {
			setRoadmap(roadmap.removeCourse(course));
			onRoadmapChange();
		} catch (e: any) {
			alert(e.messsage);
		}
	};

	const saveRoadmap = (roadmap: Roadmap) => {
		makeAuthRequest('/rest-api/roadmap/personal', 'POST', roadmap.dto)
			.then((response) => {
				setRoadmap(new Roadmap(response.data.courses));
				onRoadmapChange(false);
			})
			.catch((e) => {
				alert(e);
			});
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={8} textAlign="center">
				<h1>Personal roadmap</h1>
				{roadmap.dto.courses.length > 0 ? (
					<CourseTree
						courses={roadmap.dto.courses as CourseDTO[]}
						onRemoveCourse={removeCourseFromRoadmap}
						key={roadmapTimestamp}
					/>
				) : (
					<p>User has empty roadmap</p>
				)}
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
							{option.department.abbreviation}-{option.courseNumber} {option.courseName}
						</Box>
					)}
					onChange={(event, newValue: CourseDTO | null) => {
						if (newValue === null) {
							return;
						}
						onSelectedCourseChange(newValue.cid);
					}}
				/>

				{selectedCourse && <CourseDetail course={selectedCourse} onCourseClick={(course: CourseDTO) => {
					onSelectedCourseChange(course.cid);
				}} />}

				<Button
					variant="contained"
					onClick={() => {
						selectedCourse && addCourseToRoadmap(selectedCourse);
					}}
					disabled={!selectedCourse}
				>
					Add to roadmap
				</Button>
			</Grid>
		</Grid>
	);
};

export default PersonalRoadmap;
