import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

const ALLOWED_SLUGS = [
  'accueil',
  'programme',
  'la-demarche',
  'qui-suis-je',
  'la-liste',
  'agenda',
  'contact',
];

export async function POST(request: NextRequest) {
  const validToken = process.env.ADMIN_SECRET ?? 'letampon2026admin';
  const token = request.cookies.get('admin_token')?.value;

  if (token !== validToken) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { slug, content } = await request.json() as { slug?: string; content?: unknown };

  if (!slug || !ALLOWED_SLUGS.includes(slug)) {
    return NextResponse.json({ error: 'Slug invalide' }, { status: 400 });
  }

  if (!content || typeof content !== 'object') {
    return NextResponse.json({ error: 'Contenu invalide' }, { status: 400 });
  }

  // Sécurité: construire le chemin de manière sûre et vérifier le répertoire
  const contentDir = path.resolve(process.cwd(), 'content', 'pages');
  const filePath = path.join(contentDir, `${slug}.json`);

  // Vérifier que le fichier est bien dans le répertoire content/pages
  if (!filePath.startsWith(contentDir)) {
    return NextResponse.json({ error: 'Chemin invalide' }, { status: 400 });
  }

  await writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}
