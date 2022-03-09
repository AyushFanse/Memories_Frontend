import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";
import profile from "./pages/Profile";
import add from "./pages/AddMemory";
import edit from "./pages/EditMemory";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={login} ></Route>
          <Route exact path="/signup" component={signup} ></Route>
          <Route exact path="/home" component={home} ></Route>
          <Route exact path="/profile" component={profile} ></Route>
          <Route exact path="/add" component={add} ></Route>
          <Route exact path="/edit/:id" component={edit} ></Route>
          <Route exact path="/*" component={Error} ></Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App;
