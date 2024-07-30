import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Dash.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function AdminReports() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate,tokenValue]);

    const handleCbt = () => {
        navigate('/cbtreport')
    }

    const handleCbl = () => {
        navigate('/cblreport')
    }

    return (
        <div style={{textAlign: "center"}}>
            <ButtonAppBar/>
            <Container>
                <Box sx={{height: '90vh'}}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Box sx={{
                                height: '90vh', display: 'flex',
                                justifyContent: 'space-around', flexDirection: 'column'
                            }}>
                                <Grid container spacing={2} style={{textAlign: 'left'}}>
                                    <Grid item xs={12}>
                                        <p style={{
                                            fontWeight: 'bold',
                                            fontSize: 70,
                                            marginTop: 0,
                                            marginBottom: 0
                                        }}>Reports</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Menu</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleCbt} style={{width: '100%'}}>Crimes by type report</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleCbl} style={{width: '100%'}}>Crimes by location report</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box sx={{
                                height: '90vh', backgroundImage: `url(${backgroundImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}