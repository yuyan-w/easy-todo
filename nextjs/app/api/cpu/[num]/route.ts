import { NextRequest, NextResponse } from "next/server";

const fibonacci = (n: number): number => {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export async function GET(
  req: NextRequest,
  { params }: { params: { num: string } }
) {
  try {
    const num = parseInt(params.num, 10);
    const validNum = isNaN(num) ? 40 : num;

    const result = fibonacci(validNum);

    return NextResponse.json({ param: validNum, result });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
