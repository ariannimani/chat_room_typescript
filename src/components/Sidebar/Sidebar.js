import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import { StateContext } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import {
  CHANGE_USER_NAME,
  LOGOUT_USER,
  USER_CHANGE_MESSAGE,
} from "../../context/actions/actions";

function Sidebar() {
  const [search, setSearch] = useState("");

  const { roomsState, userDispatch, userState, messagesDispatch } =
    useContext(StateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [changeUser, setChangeUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser);

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
    setAnchorElUser(null);
  };

  const LogOut = () => {
    userDispatch({
      type: LOGOUT_USER,
      playload: "",
    });
    handleClose();
    navigate("/");
  };

  const handleChangeUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const openChangeUserName = () => {
    setChangeUser(true);
    //userDispatch({
    //  type: LOGOUT_USER,
    //  playload: { userID: user.userId, userName: "Changes" },
    //});
    handleClose();
  };

  const changeUserName = () => {
    const user = userState.users.usersData[0];
    userDispatch({
      type: CHANGE_USER_NAME,
      playload: { userId: user.userId, userName: newUserName },
    });
    messagesDispatch({
      type: USER_CHANGE_MESSAGE,
      playload: {
        userId: Number(user.userId),
        newUserName: newUserName,
      },
    });
    setChangeUser(false);
    setNewUserName("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar___user">
          {
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${Math.floor(
                Math.random()
              )}.svg`}
              onClick={handleChangeUserClick}
            />
          }
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorElUser}
            open={openUser}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "auto",
              },
            }}
          >
            <MenuItem key="delete" onClick={openChangeUserName}>
              Change Username
            </MenuItem>
          </Menu>
          {changeUser ? (
            <div className="sidebar__changeUsername">
              <TextField
                value={newUserName}
                id="standard-basic"
                label="New Username"
                variant="outlined"
                size="small"
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Button size="small" onClick={changeUserName}>
                Submit
              </Button>
            </div>
          ) : (
            <h3>{userState.users.usersData[0].userName}</h3>
          )}
        </div>
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
