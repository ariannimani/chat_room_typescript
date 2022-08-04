import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import "./AddNewChatPopUp.css";
import { Cancel } from "@mui/icons-material";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface IAddNewChatPopUp {
  createChat: (newChatName: string) => void;
  handleCloseModal: () => void;
}

const AddNewChatPopUp: FunctionComponent<IAddNewChatPopUp> = ({
  createChat,
  handleCloseModal,
}) => {
  const [newChatName, setNewChatName] = useState<string>("");
  return (
    <React.Fragment>
      <div className="modalClose">
        <IconButton
          aria-label="cancel"
          size="small"
          className="modalClose"
          onClick={handleCloseModal}
        >
          <Cancel fontSize="inherit" />
        </IconButton>
      </div>
      <div className="newChatPopUp">
        <TextField
          value={newChatName}
          id="outlined-basic"
          label="New Chat Name"
          variant="outlined"
          onChange={(e: InputEvent) => setNewChatName(e.target.value)}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={() => createChat(newChatName)}
        >
          Create Chat
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddNewChatPopUp;
function handleCloseModal(): void {
  throw new Error("Function not implemented.");
}
