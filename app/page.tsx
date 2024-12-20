'use client';

import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTasks } from '@/lib/queries/tasks';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TaskList from '@/components/tasks/TaskList';
import TaskListSkeleton from '@/components/skeletons/TaskListSkeleton';
import { cn } from '@/lib/utils';

export default function Home() {
  const router = useRouter();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks,
  });

  if (error) return <div>Error: {error.message}</div>;

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((task) => task.completed).length || 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Todo App</h1>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => router.push('/create')}
      >
        Create task <PlusCircleIcon className="size-5" />
      </Button>

      <section className="flex w-full justify-between">
        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">Tasks</p>
          <Badge
            variant="secondary"
            className={cn(isLoading && 'animate-pulse')}
          >
            {isLoading ? '...' : totalTasks}
          </Badge>
        </div>

        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">Completed</p>
          <Badge
            variant="secondary"
            className={cn(isLoading && 'animate-pulse')}
          >
            {isLoading ? '...' : completedTasks} of{' '}
            {isLoading ? '...' : totalTasks}
          </Badge>
        </div>
      </section>

      <div className="w-full rounded-lg border border-muted-foreground"></div>

      {isLoading ? <TaskListSkeleton /> : <TaskList tasks={tasks || []} />}
    </main>
  );
}
