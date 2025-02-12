import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100%-50px)] w-full items-center justify-center">
      <div>
        <h1 className="text-center text-7xl font-bold text-gray-800 dark:text-neutral-100">
          404
        </h1>

        <div className="mt-3 w-full text-center">
          <h1 className="mb-2 text-center text-2xl text-gray-800 dark:text-neutral-100 md:text-3xl">
            Page Not Found
          </h1>
          <Link
            href="/"
            className=" text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
