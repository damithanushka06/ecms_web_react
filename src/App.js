import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store/store"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from "./Views/LandingPage";
import Register from "./Views/Register";
import LoginPage from "./Views/LoginPage";
import LogComplaint from "./Views/LogComplaint";
import TrackComplaintUser from "./Views/TrackComplaintUser";
import AdminDashboard from "./Views/AdminDashboard";
import OfficerDashboard from "./Views/OfficerDashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import TrackComplaintsAdmin from "./Views/TrackComplaintsAdmin";
import TrackComplaintsOfficer from "./Views/TrackComplaintsOfficer";
import UnderInvestigation from "./Views/UnderInvestigation";
import AdminReports from "./Views/AdminReports";
import CbtReport from "./Views/CbtReport";
import CblReport from "./Views/CblReport";
import AuditLog from "./Views/AuditLog";


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/logcomplaint" element={<LogComplaint/>}/>
                        <Route path="/trackcomplaint" element={<TrackComplaintUser/>}/>
                        <Route path="/admindash" element={<AdminDashboard/>}/>
                        <Route path="/officerdash" element={<OfficerDashboard/>}/>
                        <Route path="/trackcomplaintsadmin" element={<TrackComplaintsAdmin/>}/>
                        <Route path="/trackcomplaintsofficer" element={<TrackComplaintsOfficer/>}/>
                        <Route path="/trackcomplaintsofficerinvestigating" element={<UnderInvestigation/>}/>
                        <Route path="/adminreports" element={<AdminReports/>}/>
                        <Route path="/cbtreport" element={<CbtReport/>}/>
                        <Route path="/cblreport" element={<CblReport/>}/>
                        <Route path="/auditlog" element={<AuditLog/>}/>
                    </Route>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
