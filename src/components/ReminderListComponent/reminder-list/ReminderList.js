import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionReminder from "./ExpansionReminder";
import {orderRemindersFromDateAsc} from "../../../utils/date-functions";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ReminderList = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);


  React.useEffect(() => {
    orderRemindersFromDateAsc(props.reminders);
  });

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>

      { props.reminders.map((el, index) =>
        <ExpansionPanel expanded={expanded === 'panel'+ el.id} onChange={handleChange('panel'+el.id)} key={index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel" + el.id + "bh-content"}
            id={"panel"+el.id+"bh-header"}
          >
            <Typography className={classes.heading}>{el.text}</Typography>
          </ExpansionPanelSummary>

          <ExpansionReminder
            reminder={el}
            editReminder={props.editReminder}
            deleteReminder={props.deleteReminder}
            closeReminderList={props.closeReminderList}
          />
        </ExpansionPanel>
      )}
    </div>
  );
}


export default ReminderList;
