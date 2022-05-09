import React from 'react';
import { Link, useHistory } from "react-router-dom";
import {AppBar, styled, Box, Toolbar, IconButton, Fab, Menu, MenuItem, Typography, Tooltip} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './NavbarCommon.css';
import {FileUploadOutlined, MoreVert} from '@mui/icons-material';
import './Navbars.css';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function Navbar_for_MD() {
      
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const home = ()=>{
    history.replace('/home');
  };

  const profile = ()=>{
    history.replace('/profile');
  };

  const logout = ()=>{
    localStorage.removeItem('token');
    history.replace('/');
    alert('You have been logged out');
  };

  return (
      <div className={'Navbar_MD'}>            
          <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar>
                  <Link className="Text_Deco" to="/add">
                      <StyledFab color="secondary" aria-label="add">
                          <FileUploadOutlined />
                      </StyledFab>
                  </Link>
                  <Box sx={{ flexGrow: 1 }} />
                  <Tooltip title="Open settings">
                      <IconButton color="inherit" onClick={handleOpenUserMenu} >
                          <MoreVert />
                      </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '-30px' }}
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
              </Toolbar>
          </AppBar>
      </div>
  );
}

export default Navbar_for_MD;