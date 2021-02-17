import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreateRoomPage from "./components/CreateRoomPage.jsx";
import HomePage from "./components/HomePage.jsx";
import RoomJoinPage from "./components/RoomJoinPage.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/room/join" exact component={RoomJoinPage} />
        <Route path="/room/create" exact component={CreateRoomPage} />
      </Switch>
    </Router>
  );
}

export default App;
