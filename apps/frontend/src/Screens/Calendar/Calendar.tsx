import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Timetable from 'react-timetable-events';
import { getCurrentUserID } from '../../Utils/getCurrentUserID';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';
import '../../css/Calendar.css';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';
import { brown } from '@mui/material/colors';
import exportCalendar from './exportCalendar';

interface Class {
	id: number;
	name: string;
	startTime: Date;
	endTime: Date;
}
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
	const [courses, setCourses] = useState<any>(null);
	const [timetable, setTimetable] = useState({
		monday: [], // "M"
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
	});

	useEffect(() => {
		const uid = getCurrentUserID();
		fetch('/rest-api/term/searchCurrent')
			.then((res) => res.json())
			.then((tid) => {
				return fetch(`/rest-api/user/searchActive?uid=${uid}&tid=${tid}`);
			})
			.then((res) => res.json())
			.then((res) => {
				for (let i = 0; i < res.length; i++) {
					const events = res[i].time.split(',');
					const day = [];
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

						setTimetable(
							weeklySchedule[dayName].push({
								id: 1,
								name: res[i].courseName + ' [' + res[i].location + ']',
								startTime: startTime,
								endTime: endTime,
							}),
						);
					}
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	/*const exportCalendar = () => {
		alert('Exporting calendar...');
	};*/
	return (
		<Container maxWidth="lg">
			<div className="header">
				<h2 id="title">Weekly Schedule</h2>
				<ColorButton variant="contained" onClick={() => exportCalendar(weeklySchedule)}>
					Export
				</ColorButton>
			</div>
			<Timetable events={weeklySchedule} style={{ height: '500px' }} />
		</Container>
	);
};

export default Calendar;
export type { weeklySchedule };
