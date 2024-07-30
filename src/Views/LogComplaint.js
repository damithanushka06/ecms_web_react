import ButtonAppBar from "../components/Header";
import {Container, FormControl, Grid, MenuItem, Select} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Crime.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Textarea from '@mui/joy/Textarea';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

export default function LogComplaint(){

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate, tokenValue]);

    const [location, setLocation]=useState('');
    const [crimeType, setCrimeType]=useState('');
    const [description, setDescription]=useState('');
    const [open, setOpen] = useState(false);
    const [compalintId, setComplaintId] = useState(null);

    const [locationError, setLocationError] = useState('');
    const [crimeTypeError, setCrimeTypeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);

        if (!value.trim()) {
            setLocationError('Location is required');
        } else {
            setLocationError('');
        }
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setCrimeType(value);

        if (!value.trim()) {
            setCrimeTypeError('Crime type is required');
        } else {
            setCrimeTypeError('');
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);

        if (!value.trim()) {
            setDescriptionError("Please enter a description!");
        } else {
            setDescriptionError('');
        }
    };

    const handleBlur = () => {
        handleLocationChange({ target: { value: location } });
        handleTypeChange({ target: { value: crimeType } });
        handleDescriptionChange({ target: { value: description } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { location, crimeType, description };

        if(location !=='' &&  crimeType !=='' &&  description !==''){
            axios.post('http://localhost:8080/api/complain/create_complain', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 201) {
                        return response;
                    } else {
                        throw new Error('Failed to create complain');
                    }
                })
                .then(data => {
                    setComplaintId(data.data.id);
                    if(data.status === 201){
                        setOpen(true);
                    }
                })
                .catch(error => {
                    alert(error);
                    console.error(error);
                });
        }else{
            alert("Please fill all mandatory fields!");
        }
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/')
    };

    const handleYes = () => {
        setOpen(false);
    };

    const handleTrackComplaint = () => {
        navigate('/trackcomplaint')
    }

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
                                        <p style={{fontWeight: 'bold', fontSize: 70, marginTop: 0, marginBottom: 0}}>Report Us</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Please let us know what's not happening good.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Select location</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Age"
                                            autoWidth
                                            onChange={handleLocationChange}
                                            onBlur={handleBlur}
                                            value={location}
                                            error={!!locationError}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Western'}>Western</MenuItem>
                                            <MenuItem value={'Central'}>Central</MenuItem>
                                            <MenuItem value={'Southern'}>Southern</MenuItem>
                                            <MenuItem value={'Northern'}>Northern</MenuItem>
                                            <MenuItem value={'Eastern'}>Eastern</MenuItem>
                                            <MenuItem value={'North-Western'}>North-Western</MenuItem>
                                            <MenuItem value={'North-Central'}>North-Central</MenuItem>
                                            <MenuItem value={'Uva'}>Uva</MenuItem>
                                            <MenuItem value={'Sabaragamuwa'}>Sabaragamuwa</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Select Crime Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label2"
                                                id="demo-simple-select-helper2"
                                                label="Age"
                                                autoWidth
                                                onChange={handleTypeChange}
                                                onBlur={handleBlur}
                                                value={crimeType}
                                                error={!!crimeTypeError}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Wildlife'}>Wildlife</MenuItem>
                                                <MenuItem value={'Forest'}>Forest</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Textarea placeholder="Please describe what's hapenning" style={{minHeight: 100}} value={description} onChange={handleDescriptionChange}
                                                  onBlur={handleBlur}/>{descriptionError && <p style={{ color: 'red' }}>{descriptionError}</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                        <Button variant="contained" style={{marginLeft: 15}} onClick={handleTrackComplaint} color="success">Track complaint</Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Complaint Successfully Saved"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Your complaint (Complaint ID : {compalintId}) has been successfully added to the system. One of the officers will attend to the investigation soon.
                                                    Do you want to log another complaint?
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