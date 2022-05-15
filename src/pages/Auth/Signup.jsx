import React, { useState, useRef } from 'react';
import axios from 'axios';
import "./LoginAndSignup.css"
import { useHistory } from "react-router-dom";
import { Alert, Stack, IconButton, Button, Grid, TextField, FormControl, CircularProgress, InputLabel, Input, Link, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, KeyboardBackspace, HowToReg } from '@mui/icons-material';

const LoginComponent = ({ URL }) => {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState('');
    const [Worning, setWorning] = useState('');
    const history = useHistory();
    const contactForm = useRef();

    //-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//

    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword('');
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = contactForm.current;

        let response = '';
        try {
            setLoading(true)
            if (data.first_name.value && data.last_name.value && data.username.value && data.email.value && data.number.value && data.password.value) {

                response = await axios.post(`${URL}/register/registeruser`, {
                    first_name: data.first_name.value,
                    last_name: data.last_name.value,
                    username: data.username.value,
                    email: data.email.value,
                    number: data.number.value,
                    password: data.password.value,
                })

                if (response.status === 200) {
                    history.push('/');
                    alert("You have successfully created your account...");
                }

                if (response.status === 400) {
                    setWorning({ status: 'error', msg: "Your Are offline" })
                }

            } else {
                setWorning({ status: 'error', msg: response.data.msg })
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
        setLoading(false)
    }

    //-------------------------------* VALIDATION FUNCTIONS *-------------------------------//
    return (
        <>
            <IconButton onClick={() => { history.goBack() }} edge="start" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
                <KeyboardBackspace />
            </IconButton>
            <Box sx={{ '& .MuiTextField-root': { mt: 2 }, display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Grid className="signupLayout">
                    <h2 className="LogSignHeadTitle">
                        <HowToReg style={{ fontSize: "2rem", marginTop: '-3px', filter: 'drop-shadow(2px 2px 2px #7f7f7f)' }} />
                        SignUp
                    </h2>
                    {
                        Worning.status === 'error'
                            ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                            </Stack>
                            :
                            null
                    }
                    <form ref={contactForm} style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ '& .MuiTextField-root': { m: 1.8, width: 132 } }}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                aria-required="true"
                                name='first_name'
                            />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                name='last_name'
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Username"
                                size="small"
                                variant="standard"
                                name='username'
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Email"
                                size="small"
                                variant="standard"
                                name='email'
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                name='number'
                            />
                        </Box>
                        <FormControl sx={{ '& .MuiTextField-root': { m: 0 } }}>
                            <InputLabel htmlFor="standard-adornment-password" sx={{ ml: -1.7 }}>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                size="small"
                                sx={{ width: 293 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Grid sx={{ textAlign: 'center' }}>
                            <Button sx={{ m: 4 }} type="submit" variant="contained" disableElevation >
                                Create Account
                            </Button>
                            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                        </Grid>
                        <Grid sx={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                            <p>Already have account ? <Link onClick={() => { history.push('/') }} variant="body2">Login</Link></p>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    )
}

export default LoginComponent;
