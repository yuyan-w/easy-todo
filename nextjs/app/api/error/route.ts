import { NextResponse } from "next/server";

export async function GET() {
  const timestamp = new Date().toISOString();
  console.log({ timestamp, error: "error message" });
  return NextResponse.json({ message: "error occurred" }, { status: 400 });
}
