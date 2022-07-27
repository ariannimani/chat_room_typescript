import React, { createContext, useReducer } from "react";
import messagesInitialState from "./initialstates/messagesInitialState";
import roomsIntitialState from "./initialstates/roomsIntitialState";
import userInitialState from "./initialstates/userInitialState";
import messagesReducer from "./reducers/messagesReducer";
import roomsReducer from "./reducers/roomsReducer";
import userReducer from "./reducers/userReducer";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [roomsState, roomsDispatch] = useReducer(
    roomsReducer,
    roomsIntitialState
  );
  const [messagesState, messagesDispatch] = useReducer(
    messagesReducer,
    messagesInitialState
  );

  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  return (
    <StateContext.Provider
      value={{
        roomsState,
        messagesState,
        userState,
        roomsDispatch,
        messagesDispatch,
        userDispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
