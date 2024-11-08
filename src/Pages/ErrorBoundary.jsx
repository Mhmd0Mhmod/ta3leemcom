import Heading from "../UI/Heading.jsx";
import Button from "../UI/Button.jsx";

function ErrorBoundary({ error, resetErrorBoundary }) {
  console.log(error + "from ErrorBoundary");
  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-300"}>
      <div className={"w-3/4 bg-white p-10"}>
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
