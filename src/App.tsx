import { useEffect, useState } from "react";
import PhoneFrame from "./components/phone-frame/PhoneFrame";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { cn } from "./utils/clsx/cn";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 470);
    };

    // 초기 크기 확인
    handleResize();

    // resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center gap-12",
        "screen-wrapper",
        isMobile && "gap-0"
      )}
    >
      {isMobile ? (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto pt-0">
          <AppRoutes />
        </div>
      ) : (
        <>
          <PhoneFrame />
          <span className={"pretendard-700 text-[26px]"}>
            <b className={"pretendard-200"}>DESIGN BY</b> KOMEMTUM
          </span>
        </>
      )}
    </div>
  );
}

export default App;
