import ButtonAppBar from "../components/Header";
import {Container, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Crime.PNG';
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";

export default function TrackComplaintUser() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    const [complaintRows, setcomplaintRows] = useState([]);
    const [complainId, setcomplainId] = useState(null);

    const complaintColumns = [
        {field: 'createdDate', headerName: 'Complained Date', width: 200},
        {field: 'crimeType', headerName: 'Crime Type', width: 200},
        {field: 'location', headerName: 'Location', width: 200},
        {field: 'status', headerName: 'Status', width: 150, renderCell: (params) => (
                params.value === "Pending" ?
                <div style={{ backgroundColor: "orange", padding: 5, color: "white", borderRadius: 5}}>{params.value}</div> : params.value === "Investigation" ?
                        <div style={{ backgroundColor: "green", padding: 5, color: "white", borderRadius: 5}}>{params.value}</div> : params.value === "Approved" ?
                            <div style={{ backgroundColor: "blue", padding: 5, color: "white", borderRadius: 5}}>{params.value}</div> : <div style={{ backgroundColor: "darkolivegreen", padding: 5, color: "white", borderRadius: 5}}>{params.value}</div>
            )},
        {field: 'description', headerName: 'Description', width: 300, renderCell: (params) => (
                <div style={{ whiteSpace: 'pre-line' , paddingTop: 10, paddingBottom: 10}}>{params.value}</div>
            )}
    ];

    useEffect(() => {
        if (tokenValue === null) {
            navigate('/login');
        }
    }, [userType, navigate, tokenValue]);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get('http://localhost:8080/api/complain/get_complain_detail_by_id/' + complainId, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then(data => {
                console.log(data);
                setcomplaintRows([data]);
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/complain/get_complain_list', {
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
                setcomplaintRows(data);
            })
            .catch(error => {
                // alert(error);
                console.error(error);
            });
    }, [tokenValue]);

    return (
        <div style={{textAlign: "center"}}>
            <ButtonAppBar/>
            <Container>
                <Box sx={{height: '50vh'}}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Box sx={{
                                height: '50vh', display: 'flex',
                                justifyContent: 'space-around', flexDirection: 'column'
                            }}>
                                <Grid container spacing={2} style={{textAlign: 'left'}}>
                                    <Grid item xs={12}>
                                        <p style={{
                                            fontWeight: 'bold',
                                            fontSize: 70,
                                            marginTop: 0,
                                            marginBottom: 0
                                        }}>Track Progress</p>
                                        <p style={{fontWeight: 'bold', fontSize: 20}}>Enter complaint ID to
                                            search.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Complaint ID" variant="outlined"
                                                   style={{width: "100%", marginRight: 15}} value={complainId} onChange={(e)=>setcomplainId(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box sx={{
                                height: '50vh', backgroundImage: `url(${backgroundImage})`,
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
                <Box sx={{height: '40vh', textAlign: 'left', paddingBottom: 5}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <DataGrid
                                style={{marginTop: 50}}
                                rows={complaintRows}
                                columns={complaintColumns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {page: 0, pageSize: 5},
                                    },
                                }}
                                getRowHeight={() => 'auto'}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}