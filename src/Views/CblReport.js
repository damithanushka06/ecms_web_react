import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Dash.PNG';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import { BarChart } from '@mui/x-charts/BarChart';
import {useEffect, useState} from "react";
import axios from "axios";

export default function CblReport() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    const [wildlifeCrimes, setwildlifeCrimes] = useState([]);
    const [forestCrimes, setforestCrimes] = useState([]);

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate,tokenValue]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/complain/get_bar_chart_data', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then(data => {
                console.log(data[0]);
                setwildlifeCrimes(data[0]);
                setforestCrimes(data[1]);
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    }, []);

    const xLabels = [
        'CP',
        'SP',
        'NP',
        'WP',
        'EP',
        'NW',
        'NC',
        'UP',
        'SG'

    ];

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
                                    {userType === "ROLE_ADMIN" ? <Grid item xs={12}>
                                        <p style={{
                                            fontWeight: 'bold',
                                            fontSize: 70,
                                            marginTop: 0,
                                            marginBottom: 0
                                        }}>Provincial Crime Report</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Report</p>
                                    </Grid> : <Grid item xs={12}>
                                        <p style={{
                                            fontWeight: 'bold',
                                            fontSize: 70,
                                            marginTop: 0,
                                            marginBottom: 0
                                        }}>Unauthorized</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>You have no permission to view this report</p>
                                    </Grid>}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            {userType === "ROLE_ADMIN" ? <Box sx={{
                                height: '90vh',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {wildlifeCrimes.length !== 0 ? <BarChart
                                    width={800}
                                    height={400}
                                    series={[
                                        { data: forestCrimes, label: 'Forest', id: 'uvId' },
                                        { data: wildlifeCrimes, label: 'Wildlife', id: 'pvId' },
                                    ]}
                                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                /> : <Box sx={{
                                    height: '90vh', backgroundImage: `url(${backgroundImage})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                </Box>}

                            </Box> : <Box sx={{
                                height: '90vh', backgroundImage: `url(${backgroundImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            </Box>}

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}