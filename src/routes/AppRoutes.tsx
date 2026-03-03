import { Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import Community from "../pages/community/Community.tsx";
import MobileLayout from "../layouts/MobileLayout.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/community" element={<Community />} />
      </Route>
    </Routes>
  );
}
