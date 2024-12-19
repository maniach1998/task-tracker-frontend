import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardListIcon, PlusCircleIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Todo App</h1>

      <Button className="w-full">
        Create task <PlusCircleIcon className="size-5" />
      </Button>

      <section className="flex w-full justify-between">
        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">Tasks</p>
          <Badge>0</Badge>
        </div>

        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">Completed</p>
          <Badge>0</Badge>
        </div>
      </section>

      <div className="w-full rounded-lg border border-muted-foreground"></div>

      <section className="flex flex-col items-center justify-center gap-3">
        <ClipboardListIcon className="size-16 text-muted-foreground opacity-50" />

        <p className="font-bold text-muted-foreground">
          You don&apos;t have any tasks registered yet.
        </p>

        <p className="text-muted-foreground">
          Create tasks and organize your to-do items.
        </p>
      </section>
    </main>
  );
}
