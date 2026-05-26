import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

export default function ThemeList() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full flex-col justify-end bg-white px-4 py-5">
      <Button type="button" isFullWidth onClick={() => navigate("/custom")}>
        테마 제작하기
      </Button>
    </main>
  );
}
