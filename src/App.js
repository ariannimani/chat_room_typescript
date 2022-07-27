import "./App.css";
import Chat from "./routes/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { StateContext } from "./context/StateProvider";
import Login from "./routes/Login/Login";

function App() {
  const { userState } = useContext(StateContext);
  return (
    <div className="App">
      {userState.users.usersData.length === 0 ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" index element={""} />
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
