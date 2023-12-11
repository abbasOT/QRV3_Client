import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/superAdmin/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import GetProperty from "./pages/Commercial/GetProperty/GetProperty";
import Residents from "./pages/Commercial/All Residents/Residents";
import PinCode from "./pages/Commercial/PinCode/PinCode";
import Events from './pages/Commercial/Events/Events'
import LightTimer from "./pages/Commercial/LightTimer/LightTimer";
import VisitorScreen from "./pages/Commercial/VisitorScreen/VisitorScreen";
import UserProfile from "./pages/Commercial/UserProfile/UserProfile";
// import 



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/getProperty" element={<GetProperty />} />
        <Route exact path="/property_residents" element={<Residents />} />
        
        <Route exact path="/pin_code" element={<PinCode />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/light_timer" element={<LightTimer />} />

        <Route exact path="/visitor_screen" element={<VisitorScreen />} />
        
        <Route exact path="/profile" element={<UserProfile />} />
        
          
          </Routes>{" "}
      </Router>
    </div>
  );
}

export default App;
