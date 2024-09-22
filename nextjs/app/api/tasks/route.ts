import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Failed to fetch tasks." });
  }
}

type POSTRequest = {
  title: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: POSTRequest = await request.json();

    const task = await db.task.create({
      data: {
        title: body.title,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Failed to create task." },
      { status: 500 }
    );
  }
}

type DeleteRequest = {
  id: string;
};

export async function DELETE(request: NextRequest) {
  try {
    const body: DeleteRequest = await request.json();
    const task = await db.task.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Failed to delete task." },
      { status: 500 }
    );
  }
}
