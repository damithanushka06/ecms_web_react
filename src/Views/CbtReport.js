import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Dash.PNG';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {PieChart} from '@mui/x-charts/PieChart';
import axios from "axios";

export default function CbtReport() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    const [chartData, setchartData] = useState([]);

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate,tokenValue]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/complain/get_pie_chart_data', {
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
                console.log(data);
                setchartData(data);
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    }, []);

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
                                        }}>Crimes By Crime Type</p>
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
                                <PieChart
                                    series={[
                                        {
                                            arcLabel: (item) => `${item.label} (${item.value})`,
                                            arcLabelMinAngle: 45,
                                            data: chartData
                                        },
                                    ]}
                                    width={500}
                                    height={400}
                                />
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