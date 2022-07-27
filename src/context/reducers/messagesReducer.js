import { ADD_MESSAGE } from "../actions/actions";

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

    default:
      return state;
  }
};

export default messageReducer;
