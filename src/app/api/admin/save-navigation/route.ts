import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const validToken = process.env.ADMIN_SECRET ?? 'letampon2026admin';
  const token = request.cookies.get('admin_token')?.value;

  if (token !== validToken) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { content } = await request.json() as { content?: unknown };

  if (!content || typeof content !== 'object') {
    return NextResponse.json({ error: 'Contenu invalide' }, { status: 400 });
  }

  const filePath = path.resolve(process.cwd(), 'content', 'navigation.json');
  await writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}
