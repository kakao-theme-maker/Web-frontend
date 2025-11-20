import LeftFrame from "./components/outer-frames/LeftFrame";
import RightFrame from "./components/outer-frames/RightFrame";
import "./index.css";
import { cn } from "./utils/clsx/cs";

function App() {
  return (
    <div
      className={cn(
        "w-full h-screen flex justify-center items-center gap-12",
        "screen-wrapper"
      )}
    >
      <LeftFrame />
      <RightFrame />
    </div>
  );
}

export default App;
