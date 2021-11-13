import {
  ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER
} from "../actions/actionTypes";

let initialState = {
  reminders: []
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      return Object.assign({}, state, { reminders: [...state.reminders, action.payload] });

    case EDIT_REMINDER:
      return Object.assign({}, state, {
        reminders: state.reminders.map((reminder) => reminder.id === action.id ?
          // transform the one with a matching id
          {...reminder, ...action.payload } :
          // otherwise return original reminder
          reminder
        )
      });

    case DELETE_REMINDER:
      return Object.assign({}, state, {
        reminders: state.reminders.filter((item) => item.id !== action.id)
      });
    default:
      return state;
  }
};

export default reminderReducer;
