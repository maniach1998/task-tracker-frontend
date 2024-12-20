'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CreateTaskForm from '@/components/tasks/CreateTaskForm';

export default function EditTaskPage({
  searchParams,
}: {
  searchParams: {
    id: string;
    title: string;
    color: string;
    completed: string;
  };
}) {
  const router = useRouter();
  // @ts-ignore
  // Next.js 15.1 has async dynamic APIs
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id, title, color, completed } = React.use(searchParams);
  const completedBool = completed === 'true';

  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-10">
      <Button
        variant="ghost"
        size="icon"
        className="-ml-3 rounded-full"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="size-5" />
      </Button>

      <CreateTaskForm
        mode="edit"
        initialData={{
          id,
          title,
          color,
          completed: completedBool,
        }}
      />
    </main>
  );
}
