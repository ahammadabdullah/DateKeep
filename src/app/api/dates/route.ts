import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!req.url) {
    return NextResponse.json(
      { error: "Request URL is required." },
      { status: 400 }
    );
  }
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { error: "Username is required." },
      { status: 400 }
    );
  }
  try {
    const entries = await prisma.entry.findMany({
      where: {
        userId: username as string,
      },
      select: {
        note: true,
        date: true,
        id: true,
      },
    });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch entries." },
      { status: 500 }
    );
  }
}
