import Dropdown from "../../Context/DropDownList";
import Heading from "../../UI/Heading";

function DropDownList({ label, defaultValue, value, options, render, lablelStyle }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <Heading as="h2" className={`text-lg ${lablelStyle || ""}`}>
        {label}
      </Heading>
      <Dropdown>
        <Dropdown.Toggle value={value} placeholder={defaultValue || label} />
        <Dropdown.Menu>{options?.map(render)}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownList;
