import ButtonAppBar from "../components/Header";
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from '../assets/images/Crime.PNG';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import axios from "axios";

export default function AuditLog() {

    const navigate = useNavigate();

    const userType = useSelector(state => state.auth.userType);
    const tokenValue = useSelector(state => state.auth.token);

    const [complaintRows, setcomplaintRows] = useState([]);

    const complaintColumns = [
        {field: 'createdDate', headerName: 'Complained Date', width: 150},
        {field: 'updatedOn', headerName: 'Updated On', width: 110},
        {field: 'updateBy', headerName: 'Updated By', width: 150},
        {field: 'crimeType', headerName: 'Crime Type', width: 100},
        {field: 'location', headerName: 'Location', width: 150},
        {field: 'status', headerName: 'Status', width: 110, renderCell: (params) => (
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

    useEffect(() => {
        axios.get('http://localhost:8080/api/complain/get_audit_log', {
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
                alert(error);
                console.error(error);
            });
    }, []);

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
                                        }}>Audit Log</p>
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
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                    },
                                }}
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