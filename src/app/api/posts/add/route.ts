// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const result = await query(
    'INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW())',
    [title, content]
  );
  return NextResponse.json(result);
}