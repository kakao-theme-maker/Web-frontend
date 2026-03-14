import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-white py-4">
      <div className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200">
        <Outlet />
      </div>
    </div>
  );
}
