import { ACTIONS, IActionWithPayload } from "../actions/actions";
import { IRoomsState } from "../initialstates/roomsIntitialState";

export interface IActionsRooms {
  roomName: string;
  roomOwner: number;
  roomId: number;
}

const roomsReducer = (
  state: IRoomsState,
  action: IActionWithPayload<IActionsRooms>
): IRoomsState => {
  switch (action.type) {
    case ACTIONS.ADD_ROOM: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsData: [
            ...state.rooms.roomsData,
            {
              roomName: action.payload.roomName,
              roomOwner: action.payload.roomOwner,
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
    case ACTIONS.DELETE_ROOM: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsData: [
            ...state.rooms.roomsData.filter(
              (room) => room.roomId !== action.payload.roomId
            ),
          ],
        },
      };
    }
    case ACTIONS.ERROR_ADD: {
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
