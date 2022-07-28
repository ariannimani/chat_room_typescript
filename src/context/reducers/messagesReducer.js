import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  DELETE_ROOM_MESSAGE,
  USER_CHANGE_MESSAGE,
} from "../actions/actions";

const messageReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData,
            {
              message: action.playload.message,
              messageId: action.playload.messageId,
              messageChatId: action.playload.messageChatId,
              messageUserId: action.playload.messageUserId,
              messageUserName: action.playload.messageUserName.toString(),
              timestamp: action.playload.timestamp,
              deleted: false,
            },
          ],
        },
      };
    }
    case DELETE_ROOM_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.filter(
              (message) => message.messageChatId !== action.playload.roomId
            ),
          ],
        },
      };
    }
    case DELETE_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.map((obj) => {
              if (obj.messageId === action.playload.messageId) {
                return { ...obj, deleted: true };
              }

              return obj;
            }),
          ],
        },
      };
    }
    case USER_CHANGE_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesData: [
            ...state.messages.messagesData.map((obj) => {
              if (obj.messageUserId === action.playload.userId) {
                return {
                  ...obj,
                  messageUserName: action.playload.newUserName,
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
