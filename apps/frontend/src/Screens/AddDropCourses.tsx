import React, { useEffect, useState } from 'react';
import { getTokenFromCookie } from '../Utils/CookieFunctions';

import {
	TextField,
	Button,
	Typography,
	Grid,
	IconButton,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';

const AddDropCourses = () => {
	const token = getTokenFromCookie();
	const [sidInput, setSidInput] = useState('');
	const [sections, setSections] = useState<SectionDTO[]>([]);
	const [deleteSectionId, setDeleteSectionId] = useState<number | null>(null); // To store the id of the section to delete
	const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // To control the visibility of the confirmation dialog
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetchSections();
	}, []);

	const handleOpenConfirmationDialog = (sid: number) => {
		setDeleteSectionId(sid);
		setConfirmationDialogOpen(true);
	};

	const handleCloseConfirmationDialog = () => {
		setConfirmationDialogOpen(false);
	};

	const fetchSections = async () => {
		try {
			const response = await fetch(`/rest-api/user/searchSection?tid=12`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				const data = await response.json();
				setSections(data);
			} else {
				console.error('Failed to fetch sections:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch sections:', error);
		}
	};

	const handleAddSection = async () => {
		try {
			const response = await fetch(`/rest-api/user/add?sid=${sidInput}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				setSidInput('');
				fetchSections();
				setErrorMessage('');
			} else {
				const errorData = await response.json();
				if (errorData && errorData.message) {
					setErrorMessage(errorData.message); // Display error message
				} else {
					console.error('Failed to add section:', response.statusText);
				}
			}
		} catch (error) {
			console.error('Failed to add section:', error);
		}
	};

	const handleDeleteSection = async (sid: any) => {
		if (deleteSectionId !== null) {
			try {
				const response = await fetch(`rest-api/user/remove?sid=${deleteSectionId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.ok) {
					fetchSections();
				} else {
					console.error('Failed to delete section:', response.statusText);
				}
			} catch (error) {
				console.error('Failed to delete section:', error);
			}
		}

		setDeleteSectionId(null); // Reset deleteSectionId
		handleCloseConfirmationDialog(); // Close the confirmation dialog
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 2 }}>
				<div style={{ padding: '20px' }}>
					<Typography variant="h5">Add Section</Typography>
					<Grid container spacing={2} alignItems="center">
						<Grid item>
							<TextField
								label="Section ID"
								variant="outlined"
								value={sidInput}
								onChange={(e) => setSidInput(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" onClick={handleAddSection}>
								Add
							</Button>
						</Grid>
					</Grid>
					{errorMessage && <p>{errorMessage}</p>}

					<Typography variant="h5" style={{ marginTop: '20px' }}>
						Registered Sections
					</Typography>
					{sections.map((section) => (
						<div key={section.sid} style={{ marginTop: '10px' }}>
							<Typography variant={'h6'}>
								{`Course: ${section.course.courseName} (${section.sectionName}) | Location: ${section.location.building} ${section.location.roomNumber} | Time: ${section.time} `}
								<IconButton
									color="secondary"
									onClick={() => handleOpenConfirmationDialog(section.sid)}
								>
									<DeleteIcon />
								</IconButton>
							</Typography>
						</div>
					))}

					<Dialog open={confirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogContent>
							<Typography>Are you sure you want to drop this section?</Typography>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseConfirmationDialog} color="primary">
								Cancel
							</Button>
							<Button onClick={handleDeleteSection} color="secondary">
								Drop
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Container>
		</>
	);
};

export default AddDropCourses;
