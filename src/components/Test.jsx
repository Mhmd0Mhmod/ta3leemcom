import { useSearchParams } from "react-router-dom";
import AddOnlineTest from "./AddOnlineTest.jsx";
import Tests from "./Tests.jsx";
import AddOfflineTest from "./AddOfflineTest.jsx";

function Test() {
 const [searchParams] = useSearchParams();
 const test = searchParams.get("test");
 switch (test) {
  case "online":
   return <AddOnlineTest />;
  case "offline":
   return <AddOfflineTest />;
  default:
   return <Tests />;
 }
}

export default Test;
