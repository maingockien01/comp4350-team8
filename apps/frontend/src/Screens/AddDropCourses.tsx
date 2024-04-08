import React, {useEffect, useState} from 'react';
import {getTokenFromCookie} from '../Utils/CookieFunctions';
import {
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {SectionDTO} from 'packages/types/dtos/section/section.dto';
import {displayError} from '../Utils/Errors';
import {makeAuthRequest} from '../Utils/Request';
import {CURRENT_TERM_ID} from '@team8/constants/terms';
import Screen from '../Components/Screen/Screen';

const AddDropCourses = () => {
  const token = getTokenFromCookie();
  const [sidInput, setSidInput] = useState('');
  const [sections, setSections] = useState<SectionDTO[]>([]);
  const [deleteSectionId, setDeleteSectionId] = useState<number | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  /**
   * Function to handle opening confirmation dialog for section deletion.
   * @param {number} sid - The ID of the section to delete.
   */
  const handleOpenConfirmationDialog = (sid: number) => {
    setDeleteSectionId(sid);
    setConfirmationDialogOpen(true);
  };

  /**
   * Function to handle closing confirmation dialog for section deletion.
   */
  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  /**
   * Function to fetch sections from the server.
   */
  const fetchSections = async () => {
    try {
      const response = await makeAuthRequest(
        `/rest-api/user/searchSection?tid=${CURRENT_TERM_ID}`,
      );
      return setSections(response.data);
    } catch (error: any) {
      return displayError(error.message);
    }
  };

  /**
   * Function to handle adding a section.
   */
  const handleAddSection = async () => {
    try {
      const response = await fetch(`/rest-api/user/add?sid=${sidInput}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.ok) {
        setSidInput(''); // Clear input field after successful addition
        await fetchSections(); // Refresh section list
      } else {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          displayError(errorData.message);
        } else {
          console.error('Failed to add section:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Failed to add section:', error);
    }
  };

  /**
   * Function to handle deleting a section.
   */
  const handleDeleteSection = async () => {
    if (deleteSectionId !== null) {
      try {
        await makeAuthRequest(`/rest-api/user/remove?sid=${deleteSectionId}`);
        await fetchSections();
      } catch (error: any) {
        displayError(error.message);
      }
    }

    setDeleteSectionId(null); // Reset deleteSectionId
    handleCloseConfirmationDialog(); // Close the confirmation dialog
  };

  return (
    <Screen>
      <div style={{padding: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <h1 style={{margin: '0'}}>Add Section: </h1>
          </Grid>
          <Grid item>
            <TextField
              label="Section ID"
              variant="outlined"
              value={sidInput}
              onChange={(e) => setSidInput(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSection}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{mt: 5}} />
        <h1 style={{marginTop: '20px'}}>Registered Sections</h1>
        {sections.map((section, index) => (
          <div key={section.sid} style={{marginTop: '10px'}}>
            <Typography variant={'h6'} sx={{ml: 4}}>
              {/* eslint-disable-next-line max-len */}
              {`${index + 1}. Course: ${section.course.courseName} (${
                section.sectionName
              }) | Location: ${section.location.building} ${
                section.location.roomNumber
              } | Time: ${section.time} `}
              <IconButton
                color="secondary"
                onClick={() => handleOpenConfirmationDialog(section.sid)}
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
          </div>
        ))}

        <Dialog
          open={confirmationDialogOpen}
          onClose={handleCloseConfirmationDialog}
        >
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
    </Screen>
  );
};

export default AddDropCourses;
