import Dropdown from "../Context/DropDownList.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useGroups } from "../Features/Dashboard/useGroups.js";
import { useCallback, useEffect } from "react";

function FilterByGroup() {
  const { level, groupsId } = useParams();
  const [searchParams, setSearchParam] = useSearchParams();
  const { groups: allGroups, isLoading, error } = useGroups(level);
  const handleSearchParams = useCallback(
    (groupId) => {
      setSearchParam({ sg: groupId });
    },
    [setSearchParam],
  );
  useEffect(() => {
    if (isLoading) return;
    if (allGroups.length) {
      if (!searchParams.get("sg")) {
        setSearchParam({ sg: allGroups[0].id });
      }
    }
  }, [allGroups, searchParams, setSearchParam, isLoading]);
  if (isLoading) return null;
  const groups = allGroups.filter((group) => groupsId.includes(group.id));
  const value = groups.filter((group) => group.id === Number(searchParams.get("sg")))[0]?.name;
  return (
    <Dropdown>
      <Dropdown.Toggle value={value} />
      <Dropdown.Menu>
        {groups.map((group) => (
          <Dropdown.Item key={group.id} text={group?.name} onClick={() => handleSearchParams(group.id)}>
            {group.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterByGroup;
