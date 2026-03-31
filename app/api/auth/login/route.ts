import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/auth/login] error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Proxy error: ${msg}` }, { status: 500 });
  }
}
