import { useLevels } from "../Features/Dashboard/useLevels.js";
import Loading from "../UI/Loading.jsx";
import { Link } from "react-router-dom";
import Heading from "../UI/Heading.jsx";

function SelectLevel() {
  const { levels: allLevels, isLoading, error } = useLevels();
  if (isLoading) return <Loading />;
  const levels = Object.keys(allLevels).map((id) => {
    console.log(id);
    return {
      id,
      name: allLevels[id][0].name.split(" ").at(-1),
    };
  });
  return (
    <ul className={"flex flex-col gap-16"}>
      <Heading className={"font-Almaria-bold text-xl"}>المراحل الدراسيه</Heading>
      {levels.map((level) => (
        <Link key={level.id} to={`/TDashboard/level/${level.id}/${allLevels[level.id][0].id}`}>
          <li className={"rounded-md bg-gray-300 p-2 text-center opacity-80"}>{`المرحله ${level.name}ة`}</li>
        </Link>
      ))}
    </ul>
  );
}

export default SelectLevel;
