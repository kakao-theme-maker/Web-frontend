import { Route, Routes } from "react-router-dom";
import App from "../App";
import Community from "../pages/community/Community"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
}
