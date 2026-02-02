import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Home from "../pages/Home/Home";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import MatchDetail from "../pages/MatchDetail/MatchDetail";
import Booking from "../pages/Booking/Booking";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:mobileNumber"
          element={<ResetPassword />}
        />
        <Route path="/player-profile" element={<PlayerProfile />} />
        <Route path="/match/:matchId" element={<MatchDetail />} />
        <Route path="/booking/:matchId" element={<Booking />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
