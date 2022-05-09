import {Button,Grid,Typography,Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarMD from "../../components/Navbar_for_MD";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import "./Profile.css";



const ProfileComponent = ({ URL })=>{


const [user, setUser] = useState([]);
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const history = useHistory();

useEffect( () =>{ 

const Fatch = (async()=>{
    if(decodedToken==null){
        history.replace('/');
        alert("Session Timeout Please Login Again...");
    }else{
            if(decodedToken.exp*1000<=Date.now()){
                history.replace('/');
                alert("Session Timeout Please Login Again...");
            }else{
                fetch(`${URL}/users/getuser/${ decodedToken.user._id}`)
                      .then((res) => res.json())
                      .then((data) => setUser(data))
            }
}})
Fatch()
},[])

const DeleteAccount = (async (id)=>{
    if(window.confirm('Are you sure?')){
        try {
        const res = await axios.delete(`${URL}/users/deleteuser/${id}`)

        if (res.status === "OK") {
            localStorage.removeItem('token');
            history.replace('/');
            alert('Your Account has been deleted Successfully');
          }
            
    } catch (error) {
        console.log(error);
      }
    }else{
      return;
    }
})

return (
    <>
        <Navbar />
        <div className="profileContainerOutter">
            <Box sx={{'& .MuiTextField-root':{ mt:2},display: 'flex', justifyContent: 'center',mt:10}}>
                <Grid className="profileLayout">
                    <h2 className="HeadTitle">My Profile</h2>
                    <Box className={'profileData'}>
                        <Typography
                            className={"HeadText"}
                            >Name</Typography>
                        <Typography
                            className={"Userdata"}
                            >{user.first_name} {user.last_name}</Typography>
                    </Box>
                    <Box className={'profileData'}>
                        <Typography
                            className={"HeadText"}
                            >Username</Typography>
                        <Typography
                            className={"Userdata"}
                            >{user.username}</Typography>
                    </Box>
                    <Box className={'profileData'}>
                        <Typography
                            className={"HeadText"}
                            >Email</Typography>
                        <Typography
                            className={"Userdata"}
                            >{user.email}</Typography>
                    </Box>
                    <Box className={'profileData'}>
                        <Typography
                            className={"HeadText"}
                            >Number</Typography>
                        <Typography
                            className={"Userdata"}
                            >{user.number}</Typography>
                    </Box>
                    <Grid sx={{textAlign: 'center'}}>
                        <Button sx={{m:4}} onClick={()=>{DeleteAccount(user._id)}} variant="contained">
                            Delete Account
                        </Button>                      
                    </Grid>
                </Grid>
            </Box>
        </div>
        <NavbarMD />
    </>
);
}

export default ProfileComponent;