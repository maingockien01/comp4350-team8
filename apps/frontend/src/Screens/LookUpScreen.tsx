import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {TermDTO} from '@team8/types/dtos/term/term.dto';
import {DepartmentDto} from '@team8/types/dtos/course/department.dto';
import {getCourses} from '../API/Course.API';
import Screen from '../Components/Screen/Screen';
import '../css/LookUpScreen.css';

const LookUpScreen = () => {
  const [department, setDepartment] = useState<DepartmentDto[]>([]);
  const [term, setTerm] = useState<TermDTO[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDto>();
  const [selectTerm, setSelectTerm] = useState<TermDTO>();
  const [selectTermId, setSelectTermId] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedDepartment) {
      alert('Please select a department');
      return;
    }
    if (!selectTerm) {
      alert('Please select a term');
      return;
    }
    getCourses({
      departmentId: selectedDepartment.did,
      termId: selectTerm.tid,
    }).then((res) => navigate('/courses', {state: {res, selectTermId}}));
  };

  useEffect(() => {
    fetch('/rest-api/term')
      .then((res) => res.json())
      .then((res) => {
        setTerm(res);
      });

    fetch('/rest-api/department')
      .then((res) => res.json())
      .then((res) => {
        setDepartment(res);
      });
  }, []);

  return (
    <Screen>
      <Grid container sx={{border: '1px solid black'}}>
        <Grid item xs={6}>
          <Container maxWidth="xl" sx={{mt: 1, mb: 1}}>
            <Stack>
              <Typography variant="h5" sx={{mb: 2}}>
                Select a degree:{' '}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  value={
                    selectedDepartment ? selectedDepartment.did.toString() : ''
                  }
                  onChange={(e) => {
                    const selectedDepartmentId = parseInt(
                      e.target.value as string,
                    );
                    const selectedDepartmentObject = department.find(
                      (dept) => dept.did === selectedDepartmentId,
                    );
                    setSelectedDepartment(selectedDepartmentObject);
                  }}
                  label="Department"
                >
                  {department.map((dept) => (
                    <MenuItem key={dept.did} value={dept.did}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="xl" sx={{mt: 1, mb: 1}}>
            <Stack>
              <Typography variant="h5" sx={{mb: 2}}>
                Select a term:{' '}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="term-select-label">Term:</InputLabel>
                <Select
                  labelId="term-select-label"
                  id="term-select"
                  value={selectTerm ? selectTerm.tid.toString() : ''}
                  onChange={(e) => {
                    const selectedTermId = e.target.value as string;
                    const selectedTerm = term.find(
                      (term) => term.tid.toString() === selectedTermId,
                    );
                    setSelectTerm(selectedTerm);
                    setSelectTermId(selectedTermId);
                  }}
                  label="Term"
                >
                  {term.map((terms) => (
                    <MenuItem key={terms.tid} value={terms.tid.toString()}>
                      {`${terms.season} ${terms.year}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Grid>
      </Grid>
      <div className="lookup-wrapper">
        <Button onClick={() => handleSubmit()}>Apply</Button>
      </div>
    </Screen>
  );
};

export default LookUpScreen;
