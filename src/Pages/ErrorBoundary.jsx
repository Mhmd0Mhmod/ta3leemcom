import Heading from "../UI/Heading.jsx";
import Button from "../UI/Button.jsx";

function ErrorBoundary({ error }) {
  function resetErrorBoundary() {
    window.location.reload();
  }
  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-300"} dir="ltr">
      <div className={"w-3/4 space-y-10 rounded-lg bg-white p-5 shadow-2xl"}>
        <Heading as={"h1"}>Something went wrong</Heading>
        <p>{error.message}</p>
        <Button type={"outlinePrimary"} onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
