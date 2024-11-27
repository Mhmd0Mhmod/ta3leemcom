import Heading from "./Heading";

function TestTitle({ title }) {
  return (
    <div className="flex h-32 w-full items-center justify-center rounded-md bg-Secondary-500 text-2xl font-bold text-white">
      <Heading as="h2">{title}</Heading>
    </div>
  );
}
export default TestTitle;
