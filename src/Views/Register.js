import ButtonAppBar from "../components/Header";
import {Container, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/EnvPrt.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Register(){

    const navigate = useNavigate();

    const [name, setName]=useState('')
    const [nic, setNic]=useState('')
    const [email, setEmail]=useState('')
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [open, setOpen] = useState(false);

    const [nameError, setNameError] = useState('');
    const [nicError, setNicError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (!value.trim()) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const handleNicChange = (e) => {
        const value = e.target.value;
        setNic(value);

        if (!value.trim()) {
            setNicError('NIC is required');
        } else {
            setNicError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value.trim()) {
            setEmailError('Email is required');
        } else {
            setEmailError('');
        }
    };

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
        handleNameChange({ target: { value: name } });
        handleNicChange({ target: { value: nic } });
        handleEmailChange({ target: { value: email } });
        handleUsernameChange({ target: { value: username } });
        handlePasswordChange({ target: { value: password } });
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/')
    };
    const handleYes = () => {
        setOpen(false);
        navigate('/logcomplaint')
    };

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={name,nic,email,username,password}

        if(name !=='' && nic !=='' && email !=='' && username !=='' && password){
            fetch('http://localhost:8080/api/auth/signup',{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            })
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }else{
                        return response.json();
                    }
                })
                .catch(error => {
                    console.log('error',error)
                })
                .then(data => {
                    if(data.message === "User registered successfully!"){
                        setOpen(true);
                    }else if(data.message === "Error: Email is already in use!"){
                        alert("The email address you entered is already in use")
                    }else if(data.message === "Error: Username is already taken!"){
                        alert("The username you entered is already in use")
                    }else{
                        alert("Error")
                    }
                });
        }else{
            alert("Please fill all mandatory fields!");
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <ButtonAppBar/>
            <Container>
                <Box >
                    <Grid container>
                        <Grid item xs={5}>
                            <Box sx={{display: 'flex',
                                justifyContent: 'space-around', flexDirection: 'column' }}>
                                <Grid container spacing={2} style={{textAlign: 'left'}}>
                                    <Grid item xs={12}>
                                        <p style={{fontWeight: 'bold', fontSize: 70, marginTop: 0, marginBottom: 0}}>Register</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Enter your details.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Name" variant="outlined" style={{width: "100%", marginRight: 15}} value={name} onChange={handleNameChange}
                                                   onBlur={handleBlur}
                                                   error={!!nameError}
                                                   helperText={nameError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="NIC" variant="outlined" style={{width: "100%", marginRight: 15}} value={nic} onChange={handleNicChange}
                                                   onBlur={handleBlur}
                                                   error={!!nicError}
                                                   helperText={nicError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Email" variant="outlined" style={{width: "100%", marginRight: 15}} value={email} onChange={handleEmailChange}
                                                   onBlur={handleBlur}
                                                   error={!!emailError}
                                                   helperText={emailError}
                                                   required/>
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
                                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Registration Successful"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    You are now a member of ECMS. Do you want to login to continue?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={handleYes} autoFocus>
                                                    Yes
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
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