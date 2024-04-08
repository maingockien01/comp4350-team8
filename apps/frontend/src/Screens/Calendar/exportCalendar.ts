import {SCHEDULE_STRUCTURE} from './Calendar';
import {EventAttributes, createEvents} from 'ics';
import {saveAs} from 'file-saver';

/**
 * Export the calendar as an .ics file.
 *
 * @param {SCHEDULE_STRUCTURE} schedule - The schedule structure to export.
 */
function exportCalendar(schedule: typeof SCHEDULE_STRUCTURE) {
  const eventsList: Array<EventAttributes> = [];
  let index = 0;

  for (const day in schedule) {
    // Mapping function to convert the today's date to the event's date
    const daysToAdd = (7 - new Date(2024, 8, 9).getDay() + index + 1) % 7;
    const newDate = new Date(
        new Date(2024, 8, 9)
            .setDate(new Date(2024, 8, 9)
                .getDate() + daysToAdd),
    );
    const [year, month, date] = [
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      newDate.getDate(),
    ];
    // Create the event in the ics format
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
        recurrenceRule: `FREQ=WEEKLY;BYDAY=${day.substring(
            0,
            2,
        )};INTERVAL=1;UNTIL=20241227T000000Z`,
      };
      eventsList.push(event);
      index++;
    }
  }
  // Create the ics file and download it
  if (eventsList.length !== 0) {
    createEvents(eventsList, (error, value) => {
      const blob = new Blob([value], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'schedule.ics');
    });
  }
}

export default exportCalendar;
