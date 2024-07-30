import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Dash.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate,tokenValue]);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleComplaintsLog = () => {
        navigate('/trackcomplaintsadmin')
    }
    const handleReports = () => {
            navigate('/adminreports')
    }

    const handleAuditLog = () => {
            navigate('/auditlog')
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
                                        }}>Dashboard</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Main menu</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleSubmit} style={{width: '100%'}}>Add
                                            field officers</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleComplaintsLog} style={{width: '100%'}}>View
                                            complaints log</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleAuditLog} style={{width: '100%'}}>View
                                            audit log</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleSubmit} style={{width: '100%'}}>Edit
                                            users</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" onClick={handleReports} style={{width: '100%'}}>View
                                            reports</Button>
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