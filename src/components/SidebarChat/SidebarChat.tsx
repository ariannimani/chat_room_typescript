import React, { FunctionComponent, useContext } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { ACTIONS } from "../../context/actions/actions";
import { StateContext } from "../../context/StateProvider";
import { IRoomsData } from "../../context/initialstates/roomsIntitialState";

interface ISidebarChat {
  id: number | null;
  name: string;
  addNewChat: string;
}

const SidebarChat: FunctionComponent<ISidebarChat> = ({
  id,
  name,
  addNewChat,
}) => {
  const { roomsState, roomsDispatch } = useContext(StateContext);

  const createChat = () => {
    let addRoomName = prompt("Please eneter name for chat room!");

    while (
      roomsState.rooms.roomsData.some(
        // eslint-disable-next-line no-loop-func
        (room: IRoomsData) => room.roomName === addRoomName
      )
    ) {
      if (addRoomName === "") {
        addRoomName = prompt("Please enter chat name!");
      } else {
        addRoomName = prompt(
          "This chat Exists. Please use different Chat Name!"
        );
      }
    }
    roomsDispatch({
      type: ACTIONS.ADD_ROOM,
      payload: { roomName: addRoomName, roomOwner: 1 },
    });
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {/*<p>{message[0]?.message}</p>*/}
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2> Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
