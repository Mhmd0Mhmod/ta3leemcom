function Toggle({ checked, register, name, value, id }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      {/* Hidden checkbox */}
      <input type="checkbox" id={id} className="hidden" checked={checked} {...register(name)} />

      <span className={`flex h-6 w-12 items-center rounded-full border border-gray-300 p-1 transition ${value ? "bg-Secondary-500" : "bg-gray-200"}`}>
        <span className={`h-5 w-5 transform rounded-full bg-white shadow-md duration-300 ${value ? "translate-x-px" : "-translate-x-6"}`}></span>
      </span>
    </label>
  );
}

export default Toggle;
