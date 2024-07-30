import ButtonAppBar from "../components/Header";
import {Container, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/EnvPrt.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchUser} from "../redux/actions/authactions";
import {useDispatch, useSelector} from "react-redux";

export default function LoginPage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userType = useSelector(state => state.auth.userType);
    const err = useSelector(state => state.auth.error);

    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin=(e)=>{
        e.preventDefault()

        if(username !== '' && password !== ''){
            dispatch(fetchUser(username,password))
        }else{
            alert("Please fill all mandatory fields!");
        }
    }

    useEffect(() => {
        if (userType === "ROLE_PUBLIC_USER") {
            navigate('/logcomplaint');
        }else if(userType === "ROLE_ADMIN") {
            navigate('/admindash');
        }else if(userType === "ROLE_WILDLIFE_OFFICER" || userType === "ROLE_FOREST_OFFICER"){
            navigate('/officerdash');
        }
    }, [userType, navigate]);

    useEffect(() => {
        if (err === 401) {
            alert("Username or password is incorrect");
        }
    }, [err]);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        if (!value.trim()) {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value.trim()) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleBlur = () => {
        if (!username.trim()) {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div style={{textAlign: "center"}}>
            <ButtonAppBar/>
            <Container>
                <Box sx={{ height: '90vh' }}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Box sx={{height: '90vh', display: 'flex',
                                justifyContent: 'space-around', flexDirection: 'column' }}>
                                <Grid container spacing={2} style={{textAlign: 'left'}}>
                                    <Grid item xs={12}>
                                        <p style={{fontWeight: 'bold', fontSize: 70, marginTop: 0, marginBottom: 0}}>Login</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Enter your credentials.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Username" variant="outlined" style={{width: "100%", marginRight: 15}} value={username} onChange={handleUsernameChange}
                                                   onBlur={handleBlur}
                                                   error={!!usernameError}
                                                   helperText={usernameError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField type="password" label="Password" variant="outlined" style={{width: "100%", marginRight: 15}} value={password} onChange={handlePasswordChange}
                                                   onBlur={handleBlur}
                                                   error={!!passwordError}
                                                   helperText={passwordError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={handleLogin}>Login</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleRegister}>Not a registered member?</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box sx={{ height: '90vh',backgroundImage: `url(${backgroundImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', }}>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}