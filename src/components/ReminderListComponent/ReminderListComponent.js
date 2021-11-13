import React, { Component } from 'react';
import Popover from "@material-ui/core/Popover";
import { withStyles } from '@material-ui/styles';

import Typography from "@material-ui/core/Typography";
import * as dateFns from "date-fns";
import {MonthDayYearFormat} from "../../utils/date-formats";
import {
  closePopOverAction,
  closeReminderListAction,
  selectDateAction
} from "../../redux/actions/calendarActions";

import { addReminderAction, deleteReminderAction, editReminderAction } from "../../redux/actions/reminderActions";

import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ReminderList from "./reminder-list/ReminderList";
import { getRemindersOfDate, orderRemindersFromDateAsc } from "../../utils/date-functions";

const styles =  ({
  typography: {
    padding: "10px",
  },
});


class ReminderListComponent extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.closePopOver();
  }

  handleClose= () => {
    this.props.closeReminderList();
  }

  render() {
    const { classes,
      openedReminderList,
      anchorEl,
      selectedDate,
      reminders,
      editReminder,
      deleteReminder,
      closeReminderList
    } = this.props;

    const id = openedReminderList ? 'simple-popover' : undefined;


    return (
      <div>
        <Popover
          id={id}
          open={openedReminderList}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>
            Reminders for:
            <br/><b>{dateFns.format(selectedDate, MonthDayYearFormat)}</b>
          </Typography>

          <ReminderList
            reminders={orderRemindersFromDateAsc(getRemindersOfDate(reminders, selectedDate))}
            editReminder={editReminder}
            deleteReminder={deleteReminder}
            closeReminderList={closeReminderList}
          />

        </Popover>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const {
    selectedDate,
    currentMonth,
    openedReminderList,
    anchorEl,
    openedPopOver
  } = state.calendar;

  const {
    reminders
  } = state.reminder;



  return {
    selectedDate: selectedDate,
    currentMonth: currentMonth,
    openedReminderList: openedReminderList,
    openedPopOver: openedPopOver,
    anchorEl: anchorEl,
    reminders: reminders
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectDate: (date) => dispatch(selectDateAction(date)),
  closeReminderList: () => dispatch(closeReminderListAction()),
  addReminder: (reminder) => dispatch(addReminderAction(reminder)),
  editReminder: (reminder) => dispatch(editReminderAction(reminder)),
  deleteReminder: (reminder) => dispatch(deleteReminderAction(reminder)),
  closePopOver: () => dispatch(closePopOverAction())
});



ReminderListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReminderListComponent));



