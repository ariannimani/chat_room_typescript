import { ADD_MESSAGE, DELETE_ROOM_MESSAGE } from "../actions/actions";

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
              timestamp: action.playload.timestamp,
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
    default:
      return state;
  }
};

export default messageReducer;
