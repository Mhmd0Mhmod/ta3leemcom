import Heading from "./Heading.jsx";

function InstructionItem({ title, desc, icon }) {
  return (
    <div className="flex max-w-fit items-center rounded-xl px-6 py-4 shadow-2xl shadow-[#feeedc]">
      <div className="rounded-full bg-primary p-2">
        <span>{icon}</span>
      </div>
      <div className="font-almaria flex flex-col justify-between gap-2 px-12">
        <Heading as={"h5"} className="text-primary">
          {title}
        </Heading>
        <p className="font-almaria-light text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default InstructionItem;
