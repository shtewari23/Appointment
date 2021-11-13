import React from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';
import { withStyles } from '@material-ui/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ReminderForm from "./form-components/ReminderForm";

import {
  closePopOverAction,
  selectDateAction
} from "../../redux/actions/calendarActions";

import connect from "react-redux/es/connect/connect";
import {MonthDayYearFormat} from "../../utils/date-formats";
import {addReminderAction} from "../../redux/actions/reminderActions";

const styles =  ({
  typography: {
    padding: "10px",
  },
});


class ReminderPopOverComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose= () => {
    this.props.closePopOver();
  }

  render() {
    const { classes,
      openPopOver,
      closePopOver,
      anchorEl,
      selectedDate,
      addReminder,
    } = this.props;

    const id = openPopOver ? 'simple-popover' : undefined;

    return (
      <div>
        <Popover
          id={id}
          open={openPopOver}
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
            Add Reminder for
            <br/><b>{dateFns.format(selectedDate, MonthDayYearFormat)}</b>
          </Typography>
          <ReminderForm
            className={classes.typography}
            selectedDate={selectedDate}
            closePopOver={closePopOver}
            addReminder={addReminder}
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
    openedPopOver,
    anchorEl,
  } = state.calendar;



  return {
    selectedDate: selectedDate,
    currentMonth: currentMonth,
    openedPopOver: openedPopOver,
    anchorEl: anchorEl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectDate: (date) => dispatch(selectDateAction(date)),
  closePopOver: () => dispatch(closePopOverAction()),
  addReminder: (reminder) => dispatch(addReminderAction(reminder))
});



ReminderPopOverComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReminderPopOverComponent));



