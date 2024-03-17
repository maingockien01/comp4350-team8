import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
	Grid,
	List,
	ListItem,
	Typography,
	Box,
	Stack,
	ListItemText,
	ListItemButton,
} from '@mui/material';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { TermDTO } from '@team8/types/dtos/term/term.dto';
import { DepartmentDto } from '@team8/types/dtos/course/department.dto';
import { getCourses } from '../API/Course.API';

const LookUpScreen = () => {
	const selectedColor = 'red';
	const hoverColor = 'red';

	const [department, setDepartment] = useState<DepartmentDto[]>([]);
	const [term, setTerm] = useState<TermDTO[]>([]);
	const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDto>();
	const [selectTerm, setSelectTerm] = useState<TermDTO>();
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
		}).then((res) => navigate('/courses', { state: { res } }));
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
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<Grid container sx={{ border: '1px solid black' }}>
					<Grid item xs={6}>
						<Container maxWidth="xl" sx={{ mt: 1, mb: 1 }}>
							<Stack>
								<Typography variant="h4">Department: </Typography>
								<List
									sx={{
										width: '100%',
										maxWidth: 360,
										bgcolor: 'background.paper',
										position: 'relative',
										overflow: 'auto',
										maxHeight: 300,
										'& ul': { padding: 0 },
									}}
								>
									{department.map((department) => (
										<ListItem key={department.did}>
											<ListItemButton
												onClick={() => {setSelectedDepartment(department)}}
												sx={{
													background: selectedDepartment === department ? selectedColor : 'inherit',
													'&:hover': {
														backgroundColor: hoverColor,
													},
												}}
											>
												<ListItemText primary={`${department.name}`} />
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</Stack>
						</Container>
					</Grid>
					<Grid item xs={6}>
						<Container maxWidth="xl" sx={{ mt: 1, mb: 1 }}>
							<Stack>
								<Typography variant="h4">Term: </Typography>
								<List
									sx={{
										width: '100%',
										maxWidth: 360,
										bgcolor: 'background.paper',
										position: 'relative',
										overflow: 'auto',
										maxHeight: 300,
										'& ul': { padding: 0 },
									}}
								>
									{term.map((terms) => (
										<ListItem key={terms.tid}>
											<ListItemButton
												onClick={() => {setSelectTerm(terms)}}
												sx={{
													background: selectTerm === terms ? selectedColor : 'inherit',
													'&:hover': {
														backgroundColor: hoverColor,
													},
												}}
											>
												<ListItemText primary={`${terms.season} ${terms.year}`} />
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</Stack>
						</Container>
					</Grid>
				</Grid>
				<Container maxWidth="xl" sx={{ mt: 4, mb: 1 }}>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button onClick={() => handleSubmit()} sx={{ background: 'grey' }}>
							Apply
						</Button>
					</Box>
				</Container>
			</Container>
		</>
	);
};

export default LookUpScreen;
