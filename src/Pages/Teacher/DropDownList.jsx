import Dropdown from "../../Context/DropDownList";

function DropDownList({ label, defaultValue, value, options, render }) {
  return (
    <div className={"flex flex-col gap-4"}>
      <label htmlFor={"class"} className={"font-Almarai-bold text-lg"}>
        {label}
      </label>
      <Dropdown>
        <Dropdown.Toggle value={value} placeholder={defaultValue || label} />
        <Dropdown.Menu>{options?.map(render)}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownList;
