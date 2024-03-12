import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Timetable from 'react-timetable-events';
import { getTokenFromCookie, getUidFromCookie } from '../Utils/CookieFunctions';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';

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

let weeklySchedule: {
	[K: string]: any;
} = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
};

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

				for (let i = 0; i < res2Json.length; i++) {
					const events = res2Json[i].time.split(',');
					let day = [];
					for (const e of events) {
						let dayAbbr = e.charAt(0);
						let dayName = dayMappings[dayAbbr];
						let [st, et] = e.substring(1).split('-');

						// Construct the date strings
						let startDateStr = `2020-12-12T${st}:00`;
						let endDateStr = `2020-12-12T${et}:00`;
						// Create the date objects
						let startTime = new Date(startDateStr);
						let endTime = new Date(endDateStr);

						setTimetable(
							weeklySchedule[dayName].push({
								id: 1,
								name: res2Json[i].courseName + ' [' + res2Json[i].location + ']',
								startTime: startTime,
								endTime: endTime,
							}),
						);
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container maxWidth="lg">
			<h2>Weekly Schedule</h2>
			<Timetable events={weeklySchedule} style={{ height: '500px' }} />
		</Container>
	);
};

export default Calendar;
