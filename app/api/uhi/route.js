// app/api/check-session/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sessionid');

  if (sessionCookie) {
    return NextResponse.json({ message: "Authenticated", session: sessionCookie.value });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}