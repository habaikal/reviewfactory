import { Suspense } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { EditorContainer } from '@/components/editor/EditorContainer';

export async function generateStaticParams() {
  return [
    { id: 'p1' },
    { id: 'p2' },
    { id: 'p3' },
    { id: 'p4' },
    { id: 'p5' },
    { id: 'p6' },
    { id: 'demo' },
  ];
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <Suspense fallback={<div className="flex h-64 items-center justify-center text-white/50">에디터 로딩 중...</div>}>
        <EditorContainer id={params.id} />
      </Suspense>
    </AppShell>
  );
}

