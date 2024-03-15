import React, { useState, useEffect } from 'react';
import { DegreeDTO } from '@team8/types/dtos/degree/degree.dto';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { fetchAvailableDegrees, fetchDegreeWithRoadmap } from './data';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import CourseTree from '../../Components/CourseTree/CourseTree';
import { Grid, Link } from '@mui/material';
import '../../css/RoadmapScreen.css';

const Roadmap = () => {
	const [availableDegrees, setAvailableDegrees] = useState<DegreeDTO[]>([]); // Assuming availableDegrees is an array of DegreeDTOs
	const [selectedDegree, setSelectedDegree] = useState<DegreeDTO>();

	useEffect(() => {
		fetchAvailableDegrees().then((response) => setAvailableDegrees(response.data));
	}, []);

	return (
		<div className="RoadmapScreen">
			<Grid container spacing={2} maxWidth="lg">
				<Grid item xs={8}>
					<h1>Roadmap</h1>
					<p>Select a degree to view its recommended roadmap</p>
					<Autocomplete
						className="dropdown"
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Select a degree" />}
						options={availableDegrees}
						getOptionLabel={(option) => option.name}
						renderOption={(props, option) => (
							<Box component="li" {...props}>
								{option.name}
							</Box>
						)}
						onChange={(event, newValue) => {
							if (newValue) {
								fetchDegreeWithRoadmap(newValue.did).then((response) =>
									setSelectedDegree(response.data),
								);
							}
						}}
					/>

					{selectedDegree && (
						<CourseTree
							courses={selectedDegree.recommendedCourses as CourseDTO[]}
							key={selectedDegree.did}
						/>
					)}
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</div>
	);
};

export default Roadmap;
