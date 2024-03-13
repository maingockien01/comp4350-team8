import { weeklySchedule } from './Calendar';
import { EventAttributes, createEvents } from 'ics';
import { saveAs } from 'file-saver';
function exportCalendar(schedule: typeof weeklySchedule) {
	console.log(schedule);
	const eventsList: Array<EventAttributes> = [];
	let index = 0;
	for (const day in schedule) {
		// Mapping function to convert the today's date to the event's date
		const daysToAdd = (7 - new Date().getDay() + index + 1) % 7;
		const newDate = new Date(new Date().setDate(new Date().getDate() + daysToAdd));
		const [year, month, date] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
		if (schedule[day][0] !== undefined) {
			const event: EventAttributes = {
				start: [
					year,
					month,
					date,
					schedule[day][0].startTime.getHours(),
					schedule[day][0].startTime.getMinutes(),
				],
				end: [
					year,
					month,
					date,
					schedule[day][0].endTime.getHours(),
					schedule[day][0].endTime.getMinutes(),
				],
				title: schedule[day][0].name,
				location: schedule[day][0].location,
				recurrenceRule: `FREQ=WEEKLY;BYDAY=${day.substring(0, 2)};INTERVAL=1`,
			};
			eventsList.push(event);
			index++;
		}
	}
	if (eventsList.length !== 0) {
		createEvents(eventsList, (error, value) => {
			const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
			saveAs(blob, 'schedule.ics');
		});
	}
}

export default exportCalendar;
