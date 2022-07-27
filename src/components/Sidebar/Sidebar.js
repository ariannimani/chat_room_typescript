import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import { StateContext } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { LOGOUT_USER } from "../../context/actions/actions";

function Sidebar() {
  const [search, setSearch] = useState("");

  const { roomsState, userDispatch } = useContext(StateContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const SearchRoom = () => {
    const DataRooms = roomsState.rooms.roomsData.filter((room) =>
      room.roomName.toLowerCase().includes(search.toLowerCase()) ? room : ""
    );

    return DataRooms;
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = () => {
    userDispatch({
      type: LOGOUT_USER,
      playload: "",
    });
    handleClose();
    navigate("/");
  };

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
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "auto",
              },
            }}
          >
            <MenuItem key="delete" onClick={LogOut}>
              Log Out
            </MenuItem>
          </Menu>
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
