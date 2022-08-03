export interface IActionWithPayload<T> {
  payload: T;
  type: keyof typeof ACTIONS;
}
export enum ACTIONS {
  ADD_ROOM = "ADD_ROOM",
  DELETE_ROOM = "DELETE_ROOM",
  ADD_MESSAGE = "ADD_MESSAGE",
  ADD_USER = "ADD_USER",
  ERROR_ADD = "ERROR_ADD",
  DELETE_ROOM_MESSAGE = "DELETE_ROOM_MESSAGE",
  LOGOUT_USER = "LOGOUT_USER",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  CHANGE_USER_NAME = "CHANGE_USER_NAME",
  USER_CHANGE_MESSAGE = "USER_CHANGE_MESSAGE",
}
