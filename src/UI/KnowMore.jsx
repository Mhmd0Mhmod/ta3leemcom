import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

function KnowMore({ type, className, title }) {
  const navigate = useNavigate();
  return (
    <Button type={type} className={className} onClick={() => navigate("/about")}>
      {title}
    </Button>
  );
}

export default KnowMore;
