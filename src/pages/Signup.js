import React, {useState} from 'react';
import axios from 'axios';
import "./CSS/LoginAndSignup.css"
import Alert from '@mui/material/Alert';
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import {IconButton,Button,Grid,TextField,FormControl,InputLabel,Input,Link,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginComponent = (props) => {


const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [first_name,setFirstName] = useState('');
const [last_name,setLastName] = useState('');
const [username,setUsername] = useState('');
const [number,setNumber] = useState('');
const [showPassword,setShowPassword] = useState('');
const [Worning,setWorning] = useState('');
const history = useHistory();
const DataBase = 'https://memorable-memories.herokuapp.com';

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

let response = '';           
    try{               
        if(first_name==='' && last_name==='' && username===''  && email==='' && number==='' && password==='' ) {   
            setWorning({status:'error', msg:'Please fill all the details..!!!'})   
        }else{     
            response = await axios.post(`${DataBase}/register/registeruser`, {
                username:username.value,
                first_name:first_name.value,
                last_name:last_name.value,
                email: email.value, 
                number:number.value,
                password: password.value
            })
            
            setWorning(response.data);

            if(response.status===200){
                history.replace('/');                
                alert("You have successfully created your account...");   
            }}
    } catch (err){
            setWorning({status:'error', msg:'Something went wrong. Please try againg Later...'});
            alert('Something went wrong. Please try againg Later...');
    }
}

//-------------------------------* VALIDATION FUNCTIONS *-------------------------------//
return (
    <>
        <Box sx={{'& .MuiTextField-root':{ mt:2},display: 'flex', justifyContent: 'center',mt:10}}>
            <Grid className="LoginLayout">
            <h2 className="LogSignHeadTitle">SignUp</h2>
                {
                        Worning.status==='error'
                    ? 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                        </Stack>
                    : 
                        null
                }
                <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1.8,width: '13.6ch' }}}>
                        <TextField
                            id="standard"
                            label="First-Name"
                            size="small"
                            variant="standard"
                            aria-required="true"
                            value={props.first_name}
                            onChange={(e) => {setFirstName(e.currentTarget)}}
                            />
                        <TextField
                            id="standard"
                            label="Last-Name"
                            size="small"
                            variant="standard"
                            value={props.last_name}
                            onChange={(e) => {setLastName(e.currentTarget)}}
                            />
                    </Box>
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Username"
                            size="small"
                            variant="standard"
                            value={props.username}
                            onChange={(e) => {setUsername(e.currentTarget)}}
                            />
                    </Box>
                    <Box sx={{  mt:-2,'& .MuiTextField-root': { m: 1.8, width: 293}}}>
                        <TextField
                                id="standard"
                                label="Email"
                                size="small"
                                variant="standard"
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
                                />  
                    </Box>
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Number"
                            size="small"
                            variant="standard"
                            value={props.number}
                            onChange={(e) => {setNumber(e.currentTarget)}}
                            />
                    </Box>
                    <FormControl sx={{ '& .MuiTextField-root': { m: 0}}}>
                        <InputLabel htmlFor="standard-adornment-password" sx={{ml:-1.7}}>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword? 'text' : 'password'}
                            value={props.password}
                            size="small"
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
                    <Grid sx={{textAlign: 'center'}}>
                        <Button sx={{m:4}} type="submit" variant="contained" disableElevation >
                            Create Account
                        </Button>
                        <Grid sx={{textAlign: 'center', cursor: 'pointer', textDecoration: 'none'}}>
                            <p>Already have account ? <Link onClick={() =>{history.replace('/')}} variant="body2">Log-In</Link></p>
                        </Grid>                            
                    </Grid>
                </form>
            </Grid>
        </Box>         
    </>
)
}

export default LoginComponent;
