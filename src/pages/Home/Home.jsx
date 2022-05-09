import * as React from 'react';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar";
import NavbarMD from "../../components/Navbar_for_MD";
import "./Home.css";
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {Box, IconButton, Menu, MenuItem, Grid, Tooltip} from '@mui/material';

const Home = ({URL}) => {
  const [users, setUsers] = useState([]); 
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [post, setPost] = useState([]);
  const [display, setDisplay] = useState(false);
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const Email = decodedToken.user.email;
  const history = useHistory();

  useEffect(() => {

      if(decodedToken==null){
        history.replace('/');
        alert("Session Timeout Please Login Again...");
    }else{
          if(decodedToken.exp*1000<=Date.now()){
            history.replace('/');
            alert("Session Timeout Please Login Again...");
            }else{
              const fetchUsers = (async () => {
                  const res = await axios.get(`${URL}/upload`);

                  const filter = ((filter)=>{
                    setUsers( 
                    filter.filter((sort)=>{
                    if(sort.user_email.includes(Email)){
                      console.log(sort);
                      return sort;
                    }
                    return null
                  }))
                  })
                  filter(res.data)
                })
                fetchUsers();
          }
    };
  }, []);

  useEffect(()=>{
    if(users.length !== 0){
      setDisplay(true);
    }
  },[users])

  const handleDelete = async (id) => {

    if(window.confirm('Are you sure?')){
      try {
          const res = await axios.delete(`${URL}/upload/${id}`);

          if (res.status === "OK") {
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
          }
      } catch (error) {
        console.log(error);
      }
    }else{
      return;
    }
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event,post) => {
    setAnchorElUser(event.currentTarget);
    setPost(post)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const EditData = ((ID)=>{
    history.replace(`/edit/${ID}`)
  })

  return (
    <>
      <Navbar />
      <div className="postContainerOutter">
        <Grid className="postContainer">
          {
              display
            ? 
              ( users.map((user) => (
                <div className="col-lg-3 col-md-4 col-sm-5 col-sx-6 CardLayout" key={user._id}>
                  <div className="card Img__Outter m-3">
                    <img src={user.avatar} alt="" className="img-responsive"/>
                    <p className={'PostAt'} variant="body2">{moment(user.createdAt).fromNow()}</p>
                    <Box className={'tools'}>
                      <Tooltip title="Edit">
                        <IconButton onClick={(e)=>{handleOpenUserMenu(e,user)}} sx={{ p: 0 }} color="inherit">
                          <MoreVert className={'MoreVert'}/>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={() => EditData(post._id) }>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(post._id)}>Delete</MenuItem>
                      </Menu>
                    </Box>
                    <div>
                      <h4 className="Title">{user.name}</h4>
                      <p className="Discription">
                      {user.description}
                      </p>
                    </div>
                  </div>
                </div>
              )))
            : 
              <div className="emptyContainerOutter">
                <div className="noPosts">
                  <img src="ImageNotFound.png" alt="Img" />
                </div>
              </div>
          }
        </Grid>
      </div>
      <NavbarMD />
    </>
  );
};

export default Home;
