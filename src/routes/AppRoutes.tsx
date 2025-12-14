import { Route, Routes } from "react-router-dom";
import Home from "../page/main/Home";
import ThemeWrite from "../page/theme-write/ThemeWrite";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/theme-write" element={<ThemeWrite />} />
    </Routes>
  );
};

export default AppRoutes;
