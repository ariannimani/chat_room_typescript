import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  DoDisturbAlt,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  DELETE_ROOM,
  DELETE_ROOM_MESSAGE,
} from "../../context/actions/actions";
import Picker from "emoji-picker-react";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const {
    messagesState,
    userState,
    messagesDispatch,
    roomsState,
    roomsDispatch,
  } = useContext(StateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [deleteId, setDeleteId] = useState({ id: "", userId: "" });

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    setSeed(roomId);
  }, [roomId]);

  const ScrollToBottom = () => {
    let scroll_to_bottom = document.getElementById("scroll-to-bottom");
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
  };
  const sendMessage = (e) => {
    e.preventDefault();
    const current = new Date() / 1000;
    messagesDispatch({
      type: ADD_MESSAGE,
      playload: {
        message: input,
        messageId:
          messagesState.messages.messagesData.length > 0
            ? messagesState.messages.messagesData[
                messagesState.messages.messagesData.length - 1
              ].messageId + 1
            : 1,
        messageChatId: Number(roomId),
        messageUserId: Number(
          userState.users.usersData.map((user) => user.userId)
        ),
        messageUserName: userState.users.usersData.map((user) => user.userName),
        timestamp: current,
      },
    });
    setInput("");
    ScrollToBottom();
  };

  const Room = () => {
    const activeRoom = roomsState.rooms.roomsData.filter(
      (room) => room.roomId === Number(roomId)
    );
    return activeRoom.map((room) => room.roomName);
  };
  const Time = (newTimeBool, newDateTime) => {
    const messagesData = messagesState.messages.messagesData.filter(
      (message) => message.messageChatId === Number(roomId)
    );
    let newDate = "";
    if (newTimeBool) {
      newDate = newDateTime;
    } else {
      newDate = messagesData[messagesData.length - 1]?.timestamp;
    }

    const date = new Date(newDate * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  };

  const Day = () => {
    const messagesData = messagesState.messages.messagesData.filter(
      (message) => message.messageChatId === Number(roomId)
    );
    const date = new Date(
      messagesData[messagesData.length - 1]?.timestamp * 1000
    );

    const dateDigit = date.getDay();
    const week = weekday[dateDigit];
    const today = new Date();
    const dayOfWeekDigit = new Date().getDay();
    const dayToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const dayYesterday =
      date.getDate() === today.getDate() - 1 &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (dateDigit === dayOfWeekDigit && dayToday) {
      return "last seen Today at " + Time(false);
    } else if (dateDigit === dayOfWeekDigit - 1 && dayYesterday) {
      return "last seen Yesterday at" + Time(false);
    } else if (week !== undefined) {
      return "last seen on " + week + " at " + Time(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteRoom = () => {
    handleClose();
    roomsDispatch({
      type: DELETE_ROOM,
      playload: { roomId: Number(roomId) },
    });

    messagesDispatch({
      type: DELETE_ROOM_MESSAGE,
      playload: { roomId: Number(roomId) },
    });
    navigate("/");
  };

  const OpenEmoji = () => {
    setEmojiOpen(!emojiOpen);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    if (chosenEmoji !== null) {
      setInput(input + chosenEmoji.emoji);
    }
  };

  const searchShowHandler = () => {
    setSearchShow(!searchShow);
  };

  const SearchMessages = () => {
    const DataMessages = messagesState.messages.messagesData.filter((m) =>
      m.message.toLowerCase().includes(searchMessage.toLowerCase()) ? m : ""
    );
    console.log(DataMessages);

    if (searchMessage === "") {
      return DataMessages.filter(
        (filterMessage) => filterMessage.messageChatId === Number(roomId)
      );
    } else {
      return DataMessages.filter(
        (filterMessage) =>
          filterMessage.messageChatId === Number(roomId) &&
          !filterMessage.deleted
      );
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const deleteMessageHandler = (e) => {
    if (
      Number(userState.users.usersData.map((user) => user.userId)) ===
      deleteId.userId
    ) {
      messagesDispatch({
        type: DELETE_MESSAGE,
        playload: { messageId: Number(deleteId.id) },
      });
    }
    handleCloseContextMenu();
  };

  const handleContextMenuClick = (e, message, userId) => {
    if (message.messageUserId === userId && !message.deleted) {
      handleContextMenu(e);
      setDeleteId({ id: message.messageId, userId: message.messageUserId });
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{Room()}</h3>
          <p>{Day()}</p>
        </div>
        <div className="chat__headerRight">
          <div className="chat__search">
            <IconButton onClick={searchShowHandler}>
              <SearchOutlined />
            </IconButton>
            {searchShow ? (
              <input
                placeholder="Search message"
                type="text"
                value={searchMessage}
                onChange={(e) => setSearchMessage(e.target.value)}
              ></input>
            ) : (
              ""
            )}
          </div>
          <IconButton>
            <AttachFile />
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
            <MenuItem key="delete" onClick={deleteRoom}>
              Delete Room
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="chat__body" id="scroll-to-bottom">
        {SearchMessages().map((message) => (
          <div
            onContextMenu={(e) =>
              handleContextMenuClick(
                e,
                message,
                Number(userState.users.usersData[0].userId)
              )
            }
            //onClick={() => setDeleteId(message.messageId)}
            style={{ cursor: "context-menu" }}
            key={message.messageId}
          >
            <p
              className={`chat__message ${
                message.messageUserId ===
                  Number(
                    userState.users.usersData.map((user) => user.userId)
                  ) && "chat__reciever"
              } ${message.deleted === true && "chat__deleted"}`}
            >
              <span className="chat__name">{message.messageUserName}</span>
              <span className="chat__box">
                {!message.deleted ? (
                  message.message
                ) : (
                  <span className="chat__deleted__text">
                    <DoDisturbAlt fontSize="small" />
                    <span>"This message is deleted"</span>
                  </span>
                )}
                <span className="chat__timestamp">
                  {Time(true, message.timestamp)}
                </span>
              </span>
            </p>
            <Menu
              open={contextMenu !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenu !== null
                  ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                  : undefined
              }
            >
              <MenuItem
                value={message.messageId}
                onClick={deleteMessageHandler}
              >
                Delete message
              </MenuItem>
            </Menu>
          </div>
        ))}
      </div>
      <div>{emojiOpen ? <Picker onEmojiClick={onEmojiClick} /> : ""}</div>
      <div className="chat__footer">
        <IconButton onClick={OpenEmoji}>
          <InsertEmoticon />
        </IconButton>

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
