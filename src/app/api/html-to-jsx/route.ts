import { NextResponse } from "next/server";
import HtmlToJsx from "htmltojsx";

const ERROR_METHOD_NOT_ALLOWED = { error: "Method not allowed" };
const ERROR_MISSING_HTML = { error: "Missing html" };

export async function POST(request: Request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(ERROR_METHOD_NOT_ALLOWED);
    }

    const json = await request.json();
    const htmlContent = json.html;

    if (!htmlContent) {
      return NextResponse.json(ERROR_MISSING_HTML);
    }

    const htmlToJsxConverter = new HtmlToJsx({ createClass: false });
    const jsxCode = htmlToJsxConverter.convert(htmlContent);

    return NextResponse.json({ jsx: jsxCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
