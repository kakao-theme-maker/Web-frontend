import { Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import ThemeCommunityList from "../pages/theme-community/List.tsx";
import ThemeCommunityDetail from "../pages/theme-community/Detail.tsx";
import DesignCommunityList from "../pages/design-community/List.tsx";
import DesignCommunityDetail from "../pages/design-community/Detail.tsx";
import BoardThemeSelect from "../pages/theme-community/BoardThemeSelect.tsx";
import BoardWrite from "../pages/theme-community/BoardWrite.tsx";
import BoardDesignSelect from "../pages/design-community/BoardDesignSelect.tsx";
import BoardDesignWrite from "../pages/design-community/BoardDesignWrite.tsx";
import MyPage from "../pages/mypage/MyPage.tsx";
import ProfileEdit from "../pages/mypage/ProfileEdit.tsx";
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
            <Route path="/community" element={<ThemeCommunityList />} />
            <Route path="/community/write" element={<BoardThemeSelect />} />
            <Route path="/community/write/post" element={<BoardWrite />} />
            <Route path="/community/:boardId" element={<ThemeCommunityDetail />} />
            <Route path="/design" element={<DesignCommunityList />} />
            <Route path="/design/write" element={<BoardDesignSelect />} />
            <Route path="/design/write/post" element={<BoardDesignWrite />} />
            <Route path="/design/:boardId" element={<DesignCommunityDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/profile-edit" element={<ProfileEdit />} />
          </Route>
        </Route>
      </Routes>
    </AuthInitializer>
  );
}
