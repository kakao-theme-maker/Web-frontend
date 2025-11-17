import "./index.css";
import { cn } from "./utils/clsx/cs";

function App() {
  return (
    <div
      className={cn(
        "w-full h-[100vh] bg-blue-500",
        "flex items-center justify-center",
        "text-[24px] text-white font-bold"
      )}
    >
      Initial Page
    </div>
  );
}

export default App;
