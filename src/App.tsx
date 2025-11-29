import PhoneFrame from "./components/phone-frame/PhoneFrame";
import "./index.css";
import { cn } from "./utils/clsx/cs";

function App() {
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col justify-center items-center gap-12",
        "screen-wrapper"
      )}
    >
      <PhoneFrame />
      <span className={"pretendard-700 text-[26px]"}>
        <b className={"pretendard-200"}>DESIGN BY</b> KOMEMTUM
      </span>
    </div>
  );
}

export default App;
