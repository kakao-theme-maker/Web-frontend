import { Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import Community from "../pages/community/Community.tsx";
import CommunityDetail from "../pages/community/CommunityDetail.tsx";
import MyPage from "../pages/mypage/MyPage.tsx";
import MobileLayout from "../layouts/MobileLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Login from "../pages/auth/Login.tsx";
import SignUp from "../pages/auth/SignUp.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:boardId" element={<CommunityDetail />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}
