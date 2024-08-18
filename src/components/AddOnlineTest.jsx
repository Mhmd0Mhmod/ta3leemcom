import { useSearchParams } from "react-router-dom";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { constraints } from "../config";

function AddOnlineTest() {
 const [searchParams, setSearchParams] = useSearchParams();

 return <div>Online Test</div>;
}

export default AddOnlineTest;
