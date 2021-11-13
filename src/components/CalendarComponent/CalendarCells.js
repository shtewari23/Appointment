import React from "react";
import * as dateFns from "date-fns";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { getRemindersOfDate } from "../../utils/date-functions";
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
    zIndex: 10,
    fontSize: 30,
    position: "relative"
  },
}));

const CalendarCells = (props) => {

  const classes = useStyles();

  const { currentMonth,
    selectedDate,
    onDateClick,
    onClickPopOver,
    onClickReminderList,
    reminders
  } = props;

  //taking month's boundaries
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);

  //taking begin and end of a Week - it can be starting from previous month
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = "d";

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);

      const cloneDay = day;

      days.push(
        <div
          className={`col cell ${
            //disable/selected/nothing ternary operation
            !dateFns.isSameMonth(day, monthStart) ? "disabled" : (dateFns.isSameDay(day, selectedDate) ? "selected" : "") }`
          }
          key={day}
          onClick={(e) => {
            onDateClick(dateFns.toDate(cloneDay));
            onClickPopOver(e);
          }}
        >

          {
            (getRemindersOfDate(reminders, day).length > 0) ? (

              <IconButton onClick={(e) => {
                  onDateClick(dateFns.toDate(cloneDay));
                  onClickReminderList(e);
                }}
              >
                <NotificationsOutlinedIcon
                  className={classes.iconHover}
                  color="error"
                />
              </IconButton>
            ) : null
          }

          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );

      //next day...
      day = dateFns.addDays(day, 1);
    }

    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="body">{rows}</div>;
}


export default CalendarCells;
