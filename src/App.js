import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Commercial/LandingPage/LandingPage";

import SignUp from "./pages/SignUp/SignUp";
import GetProperty from "./pages/Commercial/GetProperty/GetProperty";
import Residents from "./pages/Commercial/All Residents/Residents";
import PinCode from "./pages/Commercial/PinCode/PinCode";
import Events from "./pages/Commercial/Events/Events";
import LightTimer from "./pages/Commercial/LightTimer/LightTimer";
import VisitorScreen from "./pages/Commercial/VisitorScreen/VisitorScreen";
import UserProfile from "./pages/Commercial/UserProfile/UserProfile";

import CommercialLogin from "./pages/Commercial/Login/Login";
// super Admin
import SuperProfile from './pages/superAdmin/Profile/Profile'
import Dashboard from "./pages/superAdmin/Dashboard/Dashboard";
import AddProperty from "./pages/superAdmin/Add Property/AddProperty";
import CommercialProperties from "./pages/superAdmin/CommercialProperties/CommercialProperties";
import ResidentialProperties from "./pages/superAdmin/ResidentialProperties/ResidentialProperties";
import Subscription from "./pages/superAdmin/Subscription/Subscription";
import PCB from "./pages/superAdmin/PCB/PCB";
import StandByProperties from "./pages/superAdmin/StandByProperties/StandByProperties";
import StandByPcb from "./pages/superAdmin/StantByPcb/StandByPcb";
import SuperLogin from "./pages/superAdmin/Login/Login";
//After QR Scan Routes
import StartVideoCall from "./pages/AfterQRScan/StartVideoCall";
import SensorError from "./pages/AfterQRScan/SensorError";
import CommercialVisitorScreen from "./pages/AfterQRScan/Commercial_Visitor_Screen";
import InvalidQR from "./pages/AfterQRScan/InvalidQR"
import AppUsers from "./pages/superAdmin/AppUsers/AppUsers";
import SignUpCommercial from "./pages/Commercial/SignUpCommercial/SignUpCommercial";
import SideBar from "./components/Commercial/SideBar/SideBar";
import MainCommercial from "./pages/Commercial/MainCommercial/MainCommercial";
import CommercialDashboard from "./components/Commercial/CommercialDashboard/CommercialDashboard";
import CommercialResidents from "./components/Commercial/CommercialResidents/CommercialResidents";
import CommercialEvents from "./components/Commercial/CommercialEvents/CommercialEvents";
import CommercialPinCode from "./components/Commercial/CommercialPinCode/CommercialPinCode";
import CommercialSettings from "./components/Commercial/CommercialSettings/CommercialSettings";
import CommercialSettingsAppLayout from "./components/Commercial/CommercialSettingsAppLayout/CommercialSettingsAppLayout";
import CommercialSettingsVisitorScreen from "./components/Commercial/CommercialSettingsVisitorScreen/CommercialSettingsVisitorScreen";
function App() {
  const hasSeenLandingPage = localStorage.getItem("hasSeenLandingPage");
  const user = localStorage.getItem("userKey");
  console.log(user);

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/superProfile" element={<SuperProfile />} />
          <Route exact path="/login" element={<CommercialLogin />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signup-commercial" element={<SignUpCommercial />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/get_property" element={<GetProperty />} />
          <Route exact path="/property_residents/:id" element={<Residents />} />
          <Route exact path="/pin_code" element={<PinCode />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/light_timer" element={<LightTimer />} />
          <Route exact path="/visitor_screen" element={<VisitorScreen />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add_property" element={<AddProperty />} />
          <Route exact path="/app_users" element={<AppUsers />} />
          <Route
            exact
            path="/commercial_properties"
            element={<CommercialProperties />}
          />
          <Route
            exact
            path="/residential_properties"
            element={<ResidentialProperties />}
          />
          <Route exact path="/subscription" element={<Subscription />} />
          <Route exact path="/pcb" element={<PCB />} />
          <Route
            exact
            path="/stand_by_properties"
            element={<StandByProperties />}
          />
          <Route exact path="/stand_by_pcb" element={<StandByPcb />} />
          <Route exact path="/super-login" element={<SuperLogin />} />
          <Route
            exact
            path="/property/:pcbId"
            element={<CommercialVisitorScreen />}
          />
          <Route
            exact
            path="/videoCall/:call_id/:token"
            element={<StartVideoCall />}
          />
          <Route exact path="/sensor_error" element={<SensorError />} />
          <Route exact path="/InvalidQR" element={<InvalidQR />} />




          <Route path="/commercial-admin" element={<MainCommercial />}>
            <Route index element={<CommercialDashboard />} />
            <Route path="residents" element={<CommercialResidents />} />
            <Route path="pincode" element={<CommercialPinCode />} />
            <Route path="events" element={<CommercialEvents />} />
            <Route path="settings" element={<CommercialSettings />} />
            <Route path="settings_app_layout" element={<CommercialSettingsAppLayout />} />
            <Route path="settings_visitor_screen" element={<CommercialSettingsVisitorScreen />} />
            <Route exact path="account" element={<UserProfile />} />
            <Route path="*" element={<CommercialDashboard />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
