'use client';

import { z } from 'zod';
import { ClipboardListIcon } from 'lucide-react';

import { taskSchema } from '@/schema/tasks';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
}: {
  tasks: z.infer<typeof taskSchema>[];
}) {
  if (tasks.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-3">
        <ClipboardListIcon className="size-16 text-muted-foreground opacity-50" />

        <p className="font-bold text-muted-foreground">
          You don&apos;t have any tasks registered yet.
        </p>

        <p className="text-muted-foreground">
          Create tasks and organize your to-do items.
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
