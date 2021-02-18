import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Room from "./components/Room.jsx";
import HomePage from "./components/HomePage.jsx";
import { MyContextProvider } from "./Context.jsx";
import RoomJoinPage from "./components/RoomJoinPage.jsx";
import CreateRoomPage from "./components/CreateRoomPage.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <MyContextProvider>
          <Route path="/" exact component={HomePage} />
          <Route path="/join" exact component={RoomJoinPage} />
          <Route path="/create" exact component={CreateRoomPage} />
          <Route path="/room/:roomCode" component={Room} />
        </MyContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
