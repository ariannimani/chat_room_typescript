import {
  Cancel,
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
import React, { useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import { StateContext } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../../context/actions/actions";
import { useContext } from "react";
import { IRoomsData } from "../../context/initialstates/roomsIntitialState";

const Sidebar = () => {
  const [search, setSearch] = useState<string>("");

  const { roomsState, userDispatch, userState, messagesDispatch } =
    useContext(StateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [changeUser, setChangeUser] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>("");

  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser);

  const navigate = useNavigate();

  const SearchRoom = () => {
    const DataRooms = roomsState.rooms.roomsData.filter(
      (room: { roomName: string }) =>
        room.roomName.toLowerCase().includes(search.toLowerCase()) ? room : ""
    );

    return DataRooms;
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElUser(null);
  };

  const LogOut = () => {
    const user = userState.users.usersData[0];
    userDispatch({
      type: ACTIONS.LOGOUT_USER,
      payload: { userId: user.userId, userName: user.userName },
    });
    handleClose();
    navigate("/");
  };

  const handleChangeUserClick = (event: any) => {
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
      type: ACTIONS.CHANGE_USER_NAME,
      payload: { userId: user.userId, userName: newUserName },
    });
    messagesDispatch({
      type: ACTIONS.USER_CHANGE_MESSAGE,
      payload: {
        messageUserId: Number(user.userId),
        messageUserName: newUserName,
        message: "",
        messageId: 0,
        messageChatId: 1,
        timestamp: 0,
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
              <Button
                size="small"
                onClick={changeUserName}
                className="changeBtn"
              >
                Submit
              </Button>
              <IconButton
                aria-label="cancel"
                size="small"
                className="cancelBtn"
                sx={{ color: "red" }}
                onClick={() => setChangeUser(false)}
              >
                <Cancel fontSize="inherit" />
              </IconButton>
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
        <SidebarChat addNewChat={""} id={0} name={"Add New Chat"} />
        {SearchRoom().length > 0
          ? SearchRoom().map((room: IRoomsData) => (
              <SidebarChat
                addNewChat={"ExistingChats"}
                key={room.roomId}
                id={room.roomId}
                name={room.roomName}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Sidebar;
