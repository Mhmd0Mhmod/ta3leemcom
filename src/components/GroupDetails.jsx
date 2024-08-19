import { useSearchParams } from "react-router-dom";
function GroupDetails({}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupID = searchParams.get("groupID");
  return <div>{groupID}</div>;
}

export default GroupDetails;
