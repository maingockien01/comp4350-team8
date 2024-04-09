import React, {useState, useEffect} from 'react';
import {DegreeDTO} from '@team8/types/dtos/degree/degree.dto';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {fetchAvailableDegrees, fetchDegreeWithRoadmap} from '../Utils/data';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';
import CourseTree from '../Components/CourseTree';
import {Grid} from '@mui/material';
import '../css/RoadmapScreen.css';
import Screen from '../Components/Screen/Screen';
import Tooltip from '@mui/material/Tooltip';

const Roadmap = () => {
  const [availableDegrees, setAvailableDegrees] = useState<DegreeDTO[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<DegreeDTO>();

  useEffect(() => {
    fetchAvailableDegrees().then((response) =>
      setAvailableDegrees(response.data),
    );
  }, []);

  return (
    <Screen>
      <Grid container spacing={2} maxWidth="lg">
        <Grid item xs={8}>
          <h1>Roadmap</h1>
          <Tooltip
            title="Select a degree to view its recommended roadmap"
            placement="right-start"
          >
            <Autocomplete
              className="roadmap_screen--dropdown"
              sx={{width: 300}}
              renderInput={(params) => (
                <TextField {...params} label="Select a degree" />
              )}
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
          </Tooltip>

          {selectedDegree && (
            <CourseTree
              courses={selectedDegree.recommendedCourses as CourseDTO[]}
              key={selectedDegree.did}
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Screen>
  );
};

export default Roadmap;
