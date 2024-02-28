import React, { useEffect, useRef, useState } from "react";
import Container from '@mui/material/Container';
import Timetable from 'react-timetable-events';
import { getCurrentUserID } from "../Utils/getCurrentUserID";
import { SectionDTO } from '@team8/types/dtos/section/section.dto'

interface Class {
  name: string,
  startTime: Date, 
  endTime: Date
}
const dayMappings: {
  [key: string]: string;
  } = {
      M: "monday",
      T: "tuesday",
      W: "wednesday",
      R: "thursday",
      F: "friday"
  };

  let weeklySchedule: {
      [K: string]:
      any
  } = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
  }

const Calendar = () => {
  const [courses, setCourses] = useState<any>(null);
  const [timetable, setTimetable] = useState({
    monday: [], // "M"
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  })
  
  useEffect(() => {
    let uid = getCurrentUserID();
    fetch('/rest-api/term/searchCurrent')
    .then((res) => res.json())
    .then((tid) => {
        return fetch(`/rest-api/user/searchActive?uid=1&tid=${tid}`);
    })
    .then((res) => res.json())
    .then((res) => {
      const events = res.time.split(',');
      let day = [];
      for(const e of events){
          let dayAbbr = e.charAt(0);
          let dayName = dayMappings[dayAbbr];
          let [st, et] = e.substring(1).split('-');
          
          // Construct the date strings
          let startDateStr = `2020-12-12T${st}:00Z`;
          let endDateStr = `2020-12-12T${et}:00Z`;
          // Create the date objects
          let startTime = new Date(startDateStr);
          let endTime = new Date(endDateStr);
  
          weeklySchedule[dayName].push({
              name: "Course Name",
              startTime: startTime,
              endTime: endTime
          })
      }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
  }, []);

  
  return(
    <Container maxWidth = "lg">
        <h2>
            Weekly Schedule
        </h2>
        <Timetable 
            events={ weeklySchedule }
            style={{ height: '500px'}}
        />
    </Container>
    );
}

export default Calendar;