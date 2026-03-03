import { Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import Community from "../pages/community/Community.tsx";
import CommunityDetail from "../pages/community/CommunityDetail.tsx";
import MobileLayout from "../layouts/MobileLayout.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:boardId" element={<CommunityDetail />} />
      </Route>
    </Routes>
  );
}
