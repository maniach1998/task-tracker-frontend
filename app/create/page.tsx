'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import CreateTaskForm from '@/components/tasks/CreateTaskForm';
import { Button } from '@/components/ui/button';

export default function CreateTaskPage() {
  const router = useRouter();

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

      <CreateTaskForm mode="create" />
    </main>
  );
}
