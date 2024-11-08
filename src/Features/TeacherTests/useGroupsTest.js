import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getTests } from "./helpers";

import { useEffect, useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { useUserContext } from "../../Context/UserProvider";

function useGroupsTest() {
  const { groupsId } = useParams();
  const groupsIds = groupsId.split(",");
  const { useUser } = useUserContext();
  const { token } = useUser();
  const [operatedTests, setOperatedTests] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchedTests, setSearchedTests] = useState([]);

  const {
    data: groupsTests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupsTests", groupsIds],
    queryFn: () => getTests(groupsIds, token),
  });
  useEffect(() => {
    if (isLoading) return;
    if (search) {
      setSearchedTests(groupsTests?.filter((test) => test.title.includes(search)));
    } else {
      setSearchedTests([...groupsTests]);
    }
  }, [search, groupsTests, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    setOperatedTests([...groupsTests]);
  }, [groupsTests, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (searchParams.has("type")) {
      const type = searchParams.get("type") === "online" ? "اونلاين" : "اوفلاين";
      setOperatedTests(searchedTests?.filter((test) => test.type === type));
    }
    if (searchParams.has("from") && searchParams.has("to")) {
      setOperatedTests(
        searchedTests?.filter(
          (test) => isBefore(searchParams.get("from"), format(test.startDate, "yyyy-MM-dd")) && isAfter(searchParams.get("to"), format(test.startDate, "yyyy-MM-dd")),
        ),
      );
      return;
    }
    if (searchParams.has("day")) {
      setOperatedTests(searchedTests?.filter((test) => format(test.startDate, "yyyy-MM-dd") === searchParams.get("day")));
      return;
    }
    if (!searchParams.has("type") && !searchParams.has("from") && !searchParams.has("to") && !searchParams.has("day")) setOperatedTests([...searchedTests]);
  }, [searchParams, searchedTests, isLoading]);

  return { tests: operatedTests, search, setSearch, isLoading, error };
}

export { useGroupsTest };
