import { ACTIONS, IActionWithPayload } from "../actions/actions";
import { IMessagesState } from "../initialstates/messagesInitialState";

export interface IActionsMessages {
  message?: string;
  messageId?: number;
  messageChatId?: number;
  messageUserId?: number;
  messageUserName?: string | string[];
  timestamp?: number;
  userId?: number;
  newUserName?: string;
  roomId?: number;
}

const messageReducer = (
  state: IMessagesState,
  action: IActionWithPayload<IActionsMessages>
) => {
  switch (action.type) {
    case ACTIONS.ADD_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData,
            {
              message: action.payload.message,
              messageId: action.payload.messageId,
              messageChatId: action.payload.messageChatId,
              messageUserId: action.payload.messageUserId,
              messageUserName: action.payload.messageUserName,
              timestamp: action.payload.timestamp,
              deleted: false,
            },
          ],
        },
      };
    }
    case ACTIONS.DELETE_ROOM_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.filter(
              (message) => message.messageChatId !== action.payload.roomId
            ),
          ],
        },
      };
    }
    case ACTIONS.DELETE_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.map((obj) => {
              if (obj.messageId === action.payload.messageId) {
                return { ...obj, deleted: true };
              }

              return obj;
            }),
          ],
        },
      };
    }
    case ACTIONS.USER_CHANGE_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.map((obj) => {
              if (obj.messageUserId === action.payload.userId) {
                return {
                  ...obj,
                  messageUserName: action.payload.newUserName,
                };
              }
              return obj;
            }),
          ],
        },
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
