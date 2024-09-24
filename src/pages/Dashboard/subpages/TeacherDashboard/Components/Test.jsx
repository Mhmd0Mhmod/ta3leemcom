import { useSearchParams } from "react-router-dom";
import AddOnlineTest from "../../../../../Features/test/AddOnlineTest.jsx";
import Tests from "../../../../../Features/test/Tests.jsx";
import AddOfflineTest from "../../../../../Features/test/AddOfflineTest.jsx";

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
