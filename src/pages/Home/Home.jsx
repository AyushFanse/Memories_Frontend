import * as React from 'react';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar";
import NavbarMD from "../../components/Navbar_for_MD";
import Alert from "../../components/Alert/Alert";
import "./Home.css";
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Box, IconButton, Menu, MenuItem, Grid, Typography, Tooltip } from '@mui/material';
import fileDownload from 'js-file-download'

const Home = ({ URL }, props) => {
  const [users, setUsers] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState();
  const [post, setPost] = useState([]);
  const [display, setDisplay] = useState(false);
  const [Worning, setWorning] = useState('');
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const Email = decodedToken.user.email;
  const history = useHistory();

  useEffect(() => {

    if (decodedToken == null) {
      history.push('/');
      return;
    }

    if (decodedToken.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      history.push('/');
      alert("Session Timeout Please Login Again...");
      return;
    }

  }, []);

  useEffect(() => {
    const fetchUsers = (async () => {
      const res = await axios.get(`${URL}/upload/get`);

      setUsers(
        res.data.filter((sort) => {
          if (sort.user_email.includes(Email)) {
            return sort;
          }
          return null
        }))

    })
    fetchUsers();
  }, [])

  useEffect(() => {
    if (users.length !== 0) {
      setDisplay(true);
    }
  }, [users])

  const handleDelete = async (id) => {
    setAnchorElUser(null);

    if (window.confirm('Are you sure?')) {
      try {
        const res = await axios.delete(`${URL}/upload/delete/${id}`);

        if (res.status === 200) {
          const updatedUsers = users.filter((user) => user._id !== id);
          setUsers(updatedUsers);
        }
      } catch (err) {

        if (!err.response) {
          setWorning({ status: 'error', msg: "Your Are offline" })
          return;
        }

        setWorning({ status: 'error', msg: err.response.data.msg });
      }
  } else {
    return;
}
  };

const handleDownload = (url, filename) => {
  
  setAnchorElUser(null);

  axios.get(url, {
    responseType: 'blob',
  })
    .then((res) => {
      fileDownload(res.data, filename)
    })
}

const handleOpenUserMenu = (event, post) => {
  setAnchorElUser(event.currentTarget);
  setPost(post)
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const EditData = ((ID) => {
  history.push(`/edit/${ID}`)
  setAnchorElUser(null);
})

return (
  <>
    <Navbar />
      {Worning ? <Alert msg={Worning.msg} mode={Worning.status} /> : null}
    <div className="postContainerOutter">
      <Grid className="postContainer">
        {
          display
            ?
            (users.map((user) => (
              <div className="col-lg-3 col-md-4 col-sm-5 col-sx-6 CardLayout" key={user._id}>
                <div className="card Img__Outter m-3">
                  <img src={user.avatar} alt="" className="img-responsive" />
                  <p className='PostAt' variant="body2">{moment(user.createdAt).fromNow()}</p>
                  <Box className='tools'>
                    <Tooltip title="Edit">
                      <IconButton onClick={(e) => { handleOpenUserMenu(e, user) }} sx={{ p: 0 }} color="inherit">
                        <MoreVert className='MoreVert' />
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
                      <MenuItem id="postItemsOut" onClick={() => EditData(post._id)}>
                        <Typography id="postItems" >Edit</Typography>
                      </MenuItem>
                      <MenuItem id="postItemsOut" onClick={() => handleDelete(post._id)}>
                        <Typography id="postItems" >Delete</Typography>
                      </MenuItem>
                      <MenuItem id="postItemsOut" onClick={() => handleDownload(post.avatar, `${post.name}.png`)} >
                        <Typography id="postItems">Download</Typography>
                      </MenuItem>
                      <MenuItem id="postItemsOut">
                        <a href={post.avatar} rel="noopener noreferrer" target="_blank" id="postItems" >Preview</a>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <div>
                    <h4 className="Title">{user.name}</h4>
                    <pre className="Discription">
                      {user.description}
                    </pre>
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
