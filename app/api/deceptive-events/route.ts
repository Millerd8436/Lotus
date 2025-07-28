// app/api/deceptive-events/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[DECEPTIVE EVENT LOGGED]:', body);
    return NextResponse.json({ message: 'Event logged' }, { status: 200 });
  } catch (error) {
    console.error('Failed to log deceptive event:', error);
    return NextResponse.json({ error: 'Failed to log deceptive event' }, { status: 500 });
  }
} 