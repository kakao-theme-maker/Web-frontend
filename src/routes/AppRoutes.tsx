import { Route, Routes } from "react-router-dom";
import { cn } from "../utils/clsx/cs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className={cn("h-full bg-red-100 flex justify-center items-center")}
          >
            let
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
