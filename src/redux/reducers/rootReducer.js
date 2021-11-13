import { combineReducers } from 'redux';
import calendarReducer from './calendarReducer';
import reminderReducer from './reminderReducer';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  reminder: reminderReducer
});

export default rootReducer;
