import { weeklySchedule } from './Calendar';
function exportCalendar(schedule: typeof weeklySchedule) {
	console.log('Exporting calendar...');
	console.log(schedule);
	const currentDate = new Date();

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();

	console.log(year, month, day);
}

export default exportCalendar;
