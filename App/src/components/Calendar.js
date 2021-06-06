import { createUseStyles } from "react-jss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const useStyles = createUseStyles({
  calendar: {
    border: "0px",
    backgroundColor: "rgba(243, 244, 246, 1)",
    "& abbr": {
      textDecoration: "none"
    },
    "& .react-calendar__tile--now": {
      backgroundColor: "#e6e6e6"
    },
    "& .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus": {
      backgroundColor: "#e6e6e6"
    }
  },
})

const CustomCalendar = () => {
  const classes = useStyles()
  return <Calendar className={classes.calendar} />
}

export default CustomCalendar
