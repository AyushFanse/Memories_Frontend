import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarMD from "../../components/Navbar_for_MD";
import {Box, Grid } from '@mui/material';
import jwt from 'jsonwebtoken';
import "../Home/Home.css";


const Error = () => {
  const history = useHistory();
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);


  useEffect(()=>{
    if(decodedToken==null){
      history.replace('/');
      alert("Session Timeout Please Login Again...");
  }else{
          if(decodedToken.exp*1000<=Date.now()){
          history.replace('/');
          alert("Session Timeout Please Login Again...");
          }}
  },[])

  return (
    <>
      <Navbar />
      <Box className="postContainerOutter">
        <Grid className="postContainer">
            <Box className="emptyContainerOutter">
                <div className="errorPosts">
                  <img src="https://i.ibb.co/SJdXspD/pngegg-2.png" alt="Img" />
                </div>
            </Box>
        </Grid>
      </Box>
      <NavbarMD />
    </>
  );
};

export default Error;
