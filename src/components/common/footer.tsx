import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div>
      <p className="text-sm font-light text-gray-600 dark:text-gray-200">
        © {year} Code Converter
      </p>
      <span className="text-sm text-gray-600 dark:text-gray-200">
        Create by{" "}
        <Link
          className="text-indigo-700 underline dark:text-indigo-400"
          href="https://www.linkedin.com/in/hossainpalin"
        >
          Hossain M Palin
        </Link>
      </span>
    </div>
  );
}
