// app/api/posts/fetch/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const results = await query('SELECT * FROM posts WHERE id = ?', [id]);
    // results is an array of rows
    const post = results[0];
    return NextResponse.json(post);
  } else {
    const results = await query('SELECT id, title, SUBSTRING(content, 1, 100) as content FROM posts');
    return NextResponse.json(results);
  }
}