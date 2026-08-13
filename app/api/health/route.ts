import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "queue",
    mock: process.env.NEXT_PUBLIC_USE_MOCK_PROVIDERS !== "false",
  });
}
