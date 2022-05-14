import React, { useState, useRef } from 'react';
import { Alert, Stack, IconButton, Button, Link, Grid, TextField, FormControl, CircularProgress, InputLabel, Input, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, LockTwoTone } from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import "./LoginAndSignup.css";
import axios from 'axios';


const LoginComponent = ({ URL }) => {

    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const history = useHistory();
    const contactForm = useRef();

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
        try {
            setLoading(true)
            if (data.email.value && data.password.value) {
                let response = await axios.post(`${URL}/register/login`, {
                    email: data.email.value,
                    password: data.password.value
                })

                setWorning(response.data);
                setLoading(false)

                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.userToken);
                    history.push('/home');
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' });
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


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Grid className="LoginLayout">
                    <h2 className="LogSignHeadTitle">
                        <LockTwoTone style={{ fontSize: "2rem", marginTop: '-10px', filter: 'drop-shadow(2px 2px 2px #7f7f7f)' }} />
                        Login
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
                    <br />
                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                name='email'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Box>
                        <br />
                        <Grid>
                            <FormControl sx={{ m: 1.8 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
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
                        </Grid>
                        <Grid sx={{ textAlign: 'center' }}>
                            <Button sx={{ mt: 4, mb: 4 }} type="submit" variant="contained" disableElevation >
                                Submit
                            </Button>
                            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                        </Grid>
                        <Grid sx={{ textAlign: 'center', cursor: 'pointer' }}>
                            <p>Don&apos;t have account ? <Link onClick={() => { history.push('/signup') }} variant="body2">Signup</Link></p>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    )

}
export default LoginComponent;