import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile/Profile";
import EditUser from "./pages/Profile/EditUser";
import AddMemory from "./pages/Addition/AddMemory";
import EditMemory from "./pages/Addition/EditMemory";
import Error from "./pages/Error/Error";
// const URL = 'https://memories-memorable.herokuapp.com';
const URL = 'http://localhost:5000';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" ><Login URL={URL}/></Route>
          <Route exact path="/signup" ><Signup URL={URL}/></Route>
          <Route exact path="/home" ><Home URL={URL}/></Route>
          <Route exact path="/profile" ><Profile URL={URL}/></Route>
          <Route exact path="/profile/:userId" ><EditUser URL={URL}/></Route>
          <Route exact path="/add" ><AddMemory URL={URL}/></Route>
          <Route exact path="/edit/:Id" ><EditMemory URL={URL}/></Route>
          <Route exact path="/*" ><Error /></Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App;
