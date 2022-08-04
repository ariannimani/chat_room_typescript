import React, { FunctionComponent, useContext, useState } from "react";
import "./SidebarChat.css";
import { Avatar, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ACTIONS } from "../../context/actions/actions";
import { StateContext } from "../../context/StateProvider";
import AddNewChatPopUp from "../AddNewChatPopUp/AddNewChatPopUp";

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
  const { roomsDispatch } = useContext(StateContext);
  const [openNewChat, setOpenNewChat] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenNewChat(true);
  };
  const handleCloseModal = () => {
    setOpenNewChat(false);
  };

  const createChat = (newChatName: string) => {
    roomsDispatch({
      type: ACTIONS.ADD_ROOM,
      payload: { roomName: newChatName, roomOwner: 1, roomId: 0 },
    });
    setOpenNewChat(false);
  };

  return addNewChat.length === 0 ? (
    <div className="sidebarChat">
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        onClick={handleOpenModal}
        className="sideBarAddNew"
      >
        Add new Chat
      </Typography>
      <Modal
        open={openNewChat}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleCloseModal}
      >
        <div className="sidebarNewChat">
          <AddNewChatPopUp
            createChat={createChat}
            handleCloseModal={handleCloseModal}
          ></AddNewChatPopUp>
        </div>
      </Modal>
    </div>
  ) : (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {/*<p>{message[0]?.message}</p>*/}
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
