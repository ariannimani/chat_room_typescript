import React, { createContext, ReactNode, useReducer } from "react";
import { IActionWithPayload } from "./actions/actions";
import messagesInitialState, {
  IMessagesState,
} from "./initialstates/messagesInitialState";
import roomsIntitialState, {
  IRoomsState,
} from "./initialstates/roomsIntitialState";
import userInitialState, { IUserState } from "./initialstates/userInitialState";
import messagesReducer, { IActionsMessages } from "./reducers/messagesReducer";
import roomsReducer, { IActionsRooms } from "./reducers/roomsReducer";
import userReducer, { IActionsUsers } from "./reducers/userReducer";

export interface IStateContext {
  roomsState: IRoomsState;
  messagesState: IMessagesState;
  userState: IUserState;
  roomsDispatch: React.Dispatch<IActionWithPayload<IActionsRooms>>;
  messagesDispatch: React.Dispatch<IActionWithPayload<IActionsMessages>>;
  userDispatch: React.Dispatch<IActionWithPayload<IActionsUsers>>;
}

export const StateContext = createContext<IStateContext>({} as IStateContext);

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const StateProvider = ({ children }: Props) => {
  const [messagesState, messagesDispatch] = useReducer(
    messagesReducer,
    messagesInitialState
  );

  const [roomsState, roomsDispatch] = useReducer(
    roomsReducer,
    roomsIntitialState
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
