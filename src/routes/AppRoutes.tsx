import { Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import Community from "../pages/community/Community.tsx";
import CommunityDetail from "../pages/community/CommunityDetail.tsx";
import MobileLayout from "../layouts/MobileLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Login from "../pages/auth/Login.tsx";
import SignUp from "../pages/auth/SignUp.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import { useAuthInit } from "../services/hooks/useAuthInit.ts";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const isInitialized = useAuthInit();

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <AuthInitializer>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:boardId" element={<CommunityDetail />} />
          </Route>
        </Route>
      </Routes>
    </AuthInitializer>
  );
}
