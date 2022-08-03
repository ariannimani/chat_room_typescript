export interface IRoomsState {
  rooms: IRooms;
}
export interface IRooms {
  roomsData: IRoomsData[];
}
export interface IRoomsData {
  roomName: string | undefined;
  roomOwner: number | undefined;
  roomId: number | undefined;
}
const roomsIntitialState: IRoomsState = {
  rooms: {
    roomsData: [
      {
        roomName: "Dev Room",
        roomOwner: 1,
        roomId: 1,
      },
      {
        roomName: "Sport Room",
        roomOwner: 1,
        roomId: 2,
      },
    ],
  },
};

export default roomsIntitialState;
