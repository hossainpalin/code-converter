import { NextResponse } from "next/server";
import svgtojsx from "svg-to-jsx";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const svgContent = json.svg;

    const jsx = await svgtojsx(svgContent);
    return NextResponse.json({ jsx });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "This is not a valid svg code" });
  }
}
