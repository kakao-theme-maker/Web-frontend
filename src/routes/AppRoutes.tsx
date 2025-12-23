import { Route, Routes } from "react-router-dom";
import Home from "../page/main/Home";
import MyPage from "../page/my-page/MyPage";
import ThemeWrite from "../page/theme-write/ThemeWrite";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/theme-write" element={<ThemeWrite />} />
    </Routes>
  );
};

export default AppRoutes;
