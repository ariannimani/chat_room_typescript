import { ADD_ROOM, ERROR_ADD } from "../actions/actions";

const roomsReducer = (state, action) => {
  switch (action.type) {
    case ADD_ROOM: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsData: [
            ...state.rooms.roomsData,
            {
              roomName: action.playload,
              roomId:
                state.rooms.roomsData.length > 0
                  ? state.rooms.roomsData[state.rooms.roomsData.length - 1]
                      .roomId + 1
                  : 1,
            },
          ],
        },
      };
    }
    case ERROR_ADD: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsData: [...state.rooms.roomsData],
        },
      };
    }
    default:
      return state;
  }
};

export default roomsReducer;
