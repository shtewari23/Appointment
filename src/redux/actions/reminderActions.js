import {
  ADD_REMINDER,
  DELETE_REMINDER,
  EDIT_REMINDER
} from "./actionTypes";

export function addReminderAction(reminder) {
  return {
    type: ADD_REMINDER,
    payload: reminder
  }
}

export function editReminderAction(reminder) {
  return {
    id: reminder.id,
    type: EDIT_REMINDER,
    payload: reminder
  }
}

export function deleteReminderAction(reminder) {
  return {
    id: reminder.id,
    type: DELETE_REMINDER,
    payload: reminder
  }
}
