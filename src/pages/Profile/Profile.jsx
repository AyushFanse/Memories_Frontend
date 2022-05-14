import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from "react-router-dom";
import { DeleteOutline, EditTwoTone } from '@mui/icons-material';
import Navbar from "../../components/Navbar";
import NavbarMD from "../../components/Navbar_for_MD";
import Alert from "../../components/Alert/Alert";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import "./Profile.css";



const ProfileComponent = ({ URL }) => {


    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState('');
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const [Worning, setWorning] = useState('');
    const Email = decodedToken.user.email;
    const history = useHistory();
    const FatchRef = useRef();

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
        FatchRef.current();
    }, [])

    const Fatch = (async () => {

        let response = await axios.get(`${URL}/users/getuser/${decodedToken.user._id}`)
        setUser(response.data);

        const res = await axios.get(`${URL}/upload/get`);

        setPosts(
            res.data.filter((sort) => {
                if (sort.user_email.includes(Email)) {
                    return sort;
                }
                return null
            }))

    })

    FatchRef.current = Fatch;


    const DeleteAccount = (async (id) => {
        setLoading(true)
        if (window.confirm('Are you sure?')) {
            try {

                if (posts.length) {
                    posts.forEach(async (post) => {
                        try {

                            await axios.delete(`${URL}/upload/delete/${post._id}`);

                        } catch (err) {

                            if (!err.response) {
                                setWorning({ status: 'error', msg: "Your Are offline" });
                                setLoading(false);
                                return;
                            }

                            setWorning({ status: 'error', msg: err.response.data.msg });
                            setLoading(false);
                        }
                    })
                }

                const res = await axios.delete(`${URL}/users/deleteuser/${id}`)

                if (res.status === 200) {
                    localStorage.removeItem('token');
                    history.push('/');
                    alert('Your Account has been deleted Successfully');
                    setLoading(false)
                }

            } catch (err) {

                if (!err.response) {
                    setWorning({ status: 'error', msg: "Your Are offline" })
                    setLoading(false)
                    return;
                }

                setWorning({ status: 'error', msg: err.response.data.msg });
                setLoading(false)
            }
        } else {
            return;
        }
    })

    return (
        <>
            <Navbar />
            {Worning ? <Alert msg={Worning.msg} mode={Worning.status} /> : null}
            {
                user
                    ?
                    <div className="profileContainerOutter">
                        <Box sx={{ '& .MuiTextField-root': { mt: 2 }, display: 'flex', justifyContent: 'center', mt: 10 }}>
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
                                <Grid className='actionButtons' sx={{ textAlign: 'center' }}>
                                    <Link to={"/profile/" + user._id}>
                                        <button className="userAddButton">Edit<EditTwoTone /></button>
                                    </Link>
                                    <button className="userDeleteButton" onClick={() => DeleteAccount(user._id)}>Delete <DeleteOutline className="userListDelete" /> </button>
                                    {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    :
                    null
            }
            <NavbarMD />
        </>
    );
}

export default ProfileComponent;