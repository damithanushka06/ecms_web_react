import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/EnvPrt.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';

export default function LandingPage() {

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogComplaint = () => {
        navigate('/logcomplaint')
    }

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
                                <Grid container>
                                    <Grid item xs={12} style={{textAlign: 'left'}}>
                                        <p style={{fontWeight: 'bold', fontSize: 70, marginTop: 0, marginBottom: 0}}>Save Our Planet</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Take action against environmental crime. Together we can save the world.</p>
                                        <Button variant="outlined" onClick={handleRegister}>Register</Button>
                                        <Button variant="contained" style={{marginLeft: 15}} onClick={handleLogComplaint}>Log a complaint</Button>
                                        <Button variant="contained" style={{marginLeft: 15}} onClick={handleTrackComplaint} color="success">Track complaint</Button>

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
