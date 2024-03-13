import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Timetable from 'react-timetable-events';
import { getTokenFromCookie } from '../../Utils/CookieFunctions';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';
import { brown } from '@mui/material/colors';
import exportCalendar from './exportCalendar';
import '../../css/Calendar.css';

const DAY_MAPPINGS: {
	[key: string]: string;
} = {
	M: 'monday',
	T: 'tuesday',
	W: 'wednesday',
	R: 'thursday',
	F: 'friday',
};

const SCHEDULE_STRUCTURE: {
	[K: string]: any;
} = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
};

interface Course {
	id: number;
	courseName: string;
	time: string;
	location: string;
}

const ExportButton = styled(Button)<ButtonProps>(() => ({
	color: 'white',
	fontWeight: 500,
	backgroundColor: '#F5A800',
	width: '150px',
	'&:hover': {
		backgroundColor: brown[600],
	},
	'&:focus': {
		backgroundColor: '#502C1E',
	},
}));

const Calendar = () => {
	const [timetable, setTimetable] = useState(SCHEDULE_STRUCTURE);
	const [hasActiveCourses, setHasActiveCourses] = useState(false);
	// Fetch the data from the server
	useEffect(() => {
		const fetchData = async () => {
			// Get the token from the cookie
			const token = getTokenFromCookie();
			try {
				// Get the current term and active courses
				const currentTerm = await fetchCurrentTerm();
				const activeCourses = await fetchActiveCourses(currentTerm, token || '');
				// Set the appropriate state based on the data
				if (activeCourses.length !== 0) {
					setHasActiveCourses(true);
					const newSchedule = createSchedule(activeCourses);
					setTimetable(newSchedule);
				} else {
					setHasActiveCourses(false);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	const fetchCurrentTerm = async (): Promise<number> => {
		const repsonse = fetch('/rest-api/term/searchCurrent');
		return (await repsonse).json();
	};

	const fetchActiveCourses = async (currentTerm: number, token: string): Promise<Array<Course>> => {
		const response = fetch(`/rest-api/user/searchActive?tid=${currentTerm}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return (await response).json();
	};

	const createSchedule = (activeCourses: Array<Course>): typeof SCHEDULE_STRUCTURE => {
		const schedule = structuredClone(SCHEDULE_STRUCTURE);
		for (let i = 0; i < activeCourses.length; i++) {
			const days = activeCourses[i].time.split(',');
			for (const day of days) {
				const dayAbbr = day.charAt(0);
				const dayName = DAY_MAPPINGS[dayAbbr];
				const [st, et] = day.substring(1).split('-');

				// Construct the date strings
				const startDateStr = `2020-12-12T${st}:00`;
				const endDateStr = `2020-12-12T${et}:00`;
				// Create the date objects
				const startTime = new Date(startDateStr);
				const endTime = new Date(endDateStr);

				schedule[dayName].push({
					id: i,
					name: activeCourses[i].courseName + ' [' + activeCourses[i].location + ']',
					startTime: startTime,
					endTime: endTime,
					location: activeCourses[i].location,
				});
			}
		}
		return schedule;
	};

	return (
		<Container maxWidth="lg">
			<div className="header">
				<h2 id="title">Weekly Schedule</h2>
				<ExportButton
					variant="contained"
					disabled={!hasActiveCourses}
					onClick={hasActiveCourses ? () => exportCalendar(timetable) : undefined}
				>
					Export
				</ExportButton>
			</div>
			<Timetable events={timetable} style={{ height: '70vh' }} hoursInterval={{ from: 7, to: 20 }} />
		</Container>
	);
};

export default Calendar;
export type { SCHEDULE_STRUCTURE };
