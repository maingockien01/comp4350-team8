import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Timetable from 'react-timetable-events';
import { getTokenFromCookie, getUidFromCookie } from '../../Utils/CookieFunctions';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';
import { brown } from '@mui/material/colors';
import exportCalendar from './exportCalendar';
import '../../css/Calendar.css';
import { DayHeaderPreviewProps, HourPreviewProps } from 'react-timetable-events/dist/types';
import { WeekendOutlined } from '@mui/icons-material';
const dayMappings: {
	[key: string]: string;
} = {
	M: 'monday',
	T: 'tuesday',
	W: 'wednesday',
	R: 'thursday',
	F: 'friday',
};

const weeklySchedule: {
	[K: string]: any;
} = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
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
	const [timetable, setTimetable] = useState(weeklySchedule);
	const [hasActiveCourses, setHasActiveCourses] = useState(false);
	// Fetch the data from the server
	useEffect(() => {
		const fetchData = async () => {
			const uid = getUidFromCookie();
			const token = getTokenFromCookie();
			try {
				const res1 = await fetch('/rest-api/term/searchCurrent');
				const res1Json = await res1.json();

				const res2 = await fetch(`/rest-api/user/searchActive?uid=${uid}&tid=${res1Json}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const res2Json = await res2.json();
				if (res2Json.length !== 0) {
					setHasActiveCourses(true);
					const newSchedule = structuredClone(weeklySchedule);
					for (let i = 0; i < res2Json.length; i++) {
						const events = res2Json[i].time.split(',');
						for (const e of events) {
							const dayAbbr = e.charAt(0);
							const dayName = dayMappings[dayAbbr];
							const [st, et] = e.substring(1).split('-');

							// Construct the date strings
							const startDateStr = `2020-12-12T${st}:00`;
							const endDateStr = `2020-12-12T${et}:00`;
							// Create the date objects
							const startTime = new Date(startDateStr);
							const endTime = new Date(endDateStr);

							newSchedule[dayName].push({
								id: i,
								name: res2Json[i].courseName + ' [' + res2Json[i].location + ']',
								startTime: startTime,
								endTime: endTime,
								location: res2Json[i].location,
							});
						}
					}
					setTimetable(newSchedule);
				} else {
					setHasActiveCourses(false);
				}
				console.log('timetable', timetable);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container maxWidth="lg">
			<div className="header">
				<h2 id="title">Weekly Schedule</h2>
				<ColorButton
					variant="contained"
					disabled={!hasActiveCourses}
					onClick={hasActiveCourses ? () => exportCalendar(timetable) : undefined}
				>
					Export
				</ColorButton>
			</div>
			<Timetable events={timetable} style={{ height: '70vh' }} hoursInterval={{ from: 7, to: 20 }} />
		</Container>
	);
};

export default Calendar;
export type { weeklySchedule };
