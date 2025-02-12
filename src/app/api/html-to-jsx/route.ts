import { NextResponse } from "next/server";
import HtmlToJsx from "htmltojsx";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const htmlContent = json.html;

    const htmlToJsxConverter = new HtmlToJsx({ createClass: false });
    const jsxCode = htmlToJsxConverter.convert(htmlContent);

    return NextResponse.json({ jsx: jsxCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
