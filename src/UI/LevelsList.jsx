import { Link, useParams } from "react-router-dom";
import { useLevels } from "../Features/Dashboard/useLevels.js";
import Loading from "./Loading.jsx";

function LevelsList() {
  const { levelId, levelYearId } = useParams();
  let { levels: allLevels, isLoading: levelsIsLoading, error: levelsError } = useLevels();
  const levels = allLevels?.[levelId];
  if (levelsIsLoading) return <Loading />;
  return (
    <div className={"w-fit rounded bg-white p-5 shadow-[9px_5px_9.1px_4px_#0884A23D]"}>
      <ul className={"flex flex-wrap gap-10"}>
        {!levelsIsLoading &&
          levels?.map((level, i) => (
            <Link
              key={i}
              to={`/TDashboard/level/${levelId}/${level.id}`}
              className={`relative cursor-pointer whitespace-nowrap p-1 ${+levelYearId === level.id ? "border-b border-b-black" : "text-gray-500 duration-300 hover:-translate-y-0.5 hover:translate-x-1 hover:text-black"}`}
            >
              <li>{level.name}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default LevelsList;
