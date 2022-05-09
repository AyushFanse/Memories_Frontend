import React, {useState} from 'react';
import {Alert,Stack,IconButton,Button,Link,Grid,TextField,FormControl,InputLabel, Input,InputAdornment,Box} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import "./LoginAndSignup.css"
import axios from 'axios'; 


const LoginComponent = ({ URL }, props) => {

const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [Worning,setWorning] = useState('');
const [showPassword,setShowPassword] = useState('');
const history = useHistory();
    
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

const handleSubmit = async (e) => {

e.preventDefault();
let response = '';
    try{
        if( email==='' && password==='' ){ 
            setWorning({ status:'error', msg:'Please fill all the details..!!!' });      
            }else{
                response = await axios.post(`${URL}/register/login`, {
                    password: password.value,
                    email: email.value
                }) 
                
                setWorning(response.data);

                if(response.data.status === 'success'){
                    localStorage.setItem( 'token', response.data.userToken );
                    history.replace('/home');
                }}
    } catch (err) {
        setWorning({status:'error', msg:err.response.data.msg});
        alert(err.response.data.msg);
    }
}


return (
    <>
        <Box sx={{display: 'flex', justifyContent: 'center', mt:10}}>
            <Grid className="LoginLayout">
                <h2 className="LogSignHeadTitle">Login</h2>
                {
                    Worning.status==='error'
                ? 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                    </Stack>
                : 
                    null
                }    
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
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
                        <br/>
                        <Grid>
                        <FormControl sx={{ m: 1.8}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword? 'text' : 'password'}
                                value={props.password}
                                sx={{width: 293}}
                                onChange={(e) => {setPassword(e.currentTarget)}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff />  : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        </Grid>
                        <Grid sx={{textAlign: 'center'}}>
                            <Button sx={{mt:4, mb:4}} type="submit" variant="contained" disableElevation >
                                Submit
                            </Button>
                        </Grid>
                        <Grid sx={{textAlign: 'center', cursor: 'pointer'}}>
                            <p>Don&apos;t have account ? <Link onClick={() =>{history.replace('/signup')}} variant="body2">Sign-Up</Link></p>
                        </Grid>
                </form>
            </Grid>
        </Box>
    </>
)
        
    }
export default LoginComponent;