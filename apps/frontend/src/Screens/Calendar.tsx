import React, { useState } from "react";
import Container from '@mui/material/Container';
// eslint-disable-next-line
// @ts-ignore
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
const Calendar = () => {
    const [config, setConfig] = useState({
        viewType: "WorkWeek",
        headerDateFormat: "dddd",
        businessBeginsHour: 8,
        businessEndsHour: 17,
        timeRangeSelectedHandling: "Disabled",
        eventMoveHandling: "Disabled",
        eventResizeHandling: "Disabled",
        eventClickHandling: "Disabled",
      });
    
    return(
    <Container maxWidth = "lg">
        <h2>
            Weekly Schedule
        </h2>
        <DayPilotCalendar {...config} />
    </Container>
    );
}

export default Calendar;