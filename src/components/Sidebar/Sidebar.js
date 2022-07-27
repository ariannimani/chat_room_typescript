import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useContext } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
//import db from "./firebase";
import { StateContext } from "../../context/StateProvider";

function Sidebar() {
  const { roomsState } = useContext(StateContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${Math.floor(
              Math.random()
            )}.svg`}
          />
        }
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text"></input>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {roomsState.rooms.roomsData.length > 0
          ? roomsState.rooms.roomsData.map((room) => (
              <SidebarChat
                key={room.roomId}
                id={room.roomId}
                name={room.roomName}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default Sidebar;
