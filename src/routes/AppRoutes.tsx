import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home.tsx";
import ThemeCommunityList from "../pages/theme-community/List.tsx";
import ThemeCommunityDetail from "../pages/theme-community/Detail.tsx";
import DesignCommunityList from "../pages/design-community/List.tsx";
import DesignCommunityDetail from "../pages/design-community/Detail.tsx";
import BoardThemeSelect from "../pages/theme-community/BoardThemeSelect.tsx";
import BoardWrite from "../pages/theme-community/BoardWrite.tsx";
import BoardDesignSelect from "../pages/design-community/BoardDesignSelect.tsx";
import BoardDesignWrite from "../pages/design-community/BoardDesignWrite.tsx";
import BoardThemeEdit from "../pages/theme-community/BoardThemeEdit.tsx";
import BoardDesignEdit from "../pages/design-community/BoardDesignEdit.tsx";
import Notification from "../pages/notification/Notification.tsx";
import MyPage from "../pages/mypage/MyPage.tsx";
import MobileLayout from "../layouts/MobileLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Login from "../pages/auth/Login.tsx";
import SignUp from "../pages/auth/SignUp.tsx";
import KakaoCallback from "../pages/auth/KakaoCallback.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import { useAuthInit } from "../services/hooks/auth/useAuthInit.ts";

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
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Navigate to="/community/theme" replace />} />
            <Route path="/community/theme" element={<ThemeCommunityList />} />
            <Route path="/community/design" element={<DesignCommunityList />} />
            <Route path="/community/theme/write/select" element={<BoardThemeSelect />} />
            <Route path="/community/theme/write" element={<BoardWrite />} />
            <Route path="/community/theme/edit/:boardId" element={<BoardThemeEdit />} />
            <Route path="/community/theme/:boardId" element={<ThemeCommunityDetail />} />
            <Route path="/community/design/write/select" element={<BoardDesignSelect />} />
            <Route path="/community/design/write" element={<BoardDesignWrite />} />
            <Route path="/community/design/edit/:boardId" element={<BoardDesignEdit />} />
            <Route path="/community/design/:boardId" element={<DesignCommunityDetail />} />
            <Route path="/notify" element={<Notification />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthInitializer>
  );
}
