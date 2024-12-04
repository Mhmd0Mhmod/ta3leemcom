import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getTests } from "./helpers";

import { useEffect, useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function useGroupsTest() {
  const { groupsId } = useParams();
  const groupsIds = groupsId.split(",");
  const token = useAuthHeader() || null;
  const [operatedTests, setOperatedTests] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchedTests, setSearchedTests] = useState([]);

  const {
    data: groupsTests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupsTests", ...groupsIds],
    queryFn: () => getTests(groupsIds, token),
  });
  const type = searchParams.get("type") === "online" ? "اونلاين" : searchParams.get("type") === "offline" ? "اوفلاين" : null;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const day = searchParams.get("day");
  useEffect(() => {
    if (isLoading || !groupsTests?.length) return;
    setOperatedTests([...groupsTests]);
  }, [groupsTests, isLoading]);
  useEffect(() => {
    if (operatedTests.length === 0) return;
    const searched = operatedTests.filter((test) => {
      if (search) {
        return test.title.includes(search);
      }
      return true;
    });
    const searchedByType = type ? searched.filter((test) => test.type === type) : searched;
    const searchedByDate = searchedByType.filter((test) => {
      if (from && to) {
        const startDate = new Date(test.startDate);
        return isAfter(startDate, new Date(from)) && isBefore(startDate, new Date(to));
      }
      if (day) {
        const startDate = new Date(test.startDate);
        return format(startDate, "EEEE") === day;
      }
      return true;
    });
    setSearchedTests(searchedByDate);
  }, [search, type, from, to, day, operatedTests]);
  return { tests: searchedTests, isLoading, setSearch, search };
}

export { useGroupsTest };
