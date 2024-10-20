import Image404 from '/public/imgs/404.svg';
export default function PageNotFound() {
  return (
    <section className="ltr bg-white text-2xl dark:bg-gray-900">
      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

          <div className="mt-6 flex items-center gap-x-3">
            <button className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto">
              <span>Go back</span>
            </button>

            <button className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto">Take me home</button>
          </div>
        </div>

        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
          <Image404 className="w-full max-w-lg lg:mx-auto" />
        </div>
      </div>
    </section>
  );
}
