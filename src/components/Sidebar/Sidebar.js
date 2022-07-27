import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import { StateContext } from "../../context/StateProvider";

function Sidebar() {
  const [search, setSearch] = useState("");

  const { roomsState } = useContext(StateContext);

  const SearchRoom = () => {
    const DataRooms = roomsState.rooms.roomsData.filter((room) =>
      room.roomName.toLowerCase().includes(search.toLowerCase()) ? room : ""
    );

    return DataRooms;
  };
  return (
    <div className="sidebar">
      {console.log(SearchRoom())}
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
          <input
            placeholder="Search or start new chat"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {SearchRoom().length > 0
          ? SearchRoom().map((room) => (
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
