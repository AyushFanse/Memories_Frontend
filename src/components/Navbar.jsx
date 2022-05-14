import * as React from 'react';
import { Link, useHistory } from "react-router-dom";
import { FileUploadOutlined, MoreVert } from '@mui/icons-material';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, Slide, useScrollTrigger, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './NavbarCommon.css';
import './Navbars.css';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


const Navbar = (props) => {

  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const home = ()=>{
    history.push('/home');
  };

  const profile = ()=>{
    history.push('/profile');
  };

  const logout = ()=>{
    localStorage.removeItem('token');
    history.push('/');
    alert('You have been logged out');
  };

  return (
    <>    
      <HideOnScroll {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className="Text_Deco TITLE" to="/home">
                  Memories
                </Link>
              </Typography>
              <Link className="Text_Deco" to="/add">              
                <Tooltip title="Upload">
                  <IconButton className={'upload__icon'} color="inherit">              
                    <FileUploadOutlined/>
                  </IconButton>  
                </Tooltip>            
              </Link>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton className={'upload__icon'} onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >                  
                  <MenuItem id="menuItemsOut" onClick={profile}>
                      <AccountCircleRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                      <Typography id="menuItems" >profile</Typography>
                  </MenuItem>
                  <MenuItem id="menuItemsOut" onClick={home}>
                      <HomeRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                      <Typography id="menuItems" >Home</Typography>
                  </MenuItem>
                  <MenuItem id="menuItemsOut" onClick={logout}>
                      <LogoutRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                      <Typography id="menuItems" >Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>

            </Toolbar>
          </AppBar>
        </Box>
      </HideOnScroll>
    </>
  );
};

export default Navbar;