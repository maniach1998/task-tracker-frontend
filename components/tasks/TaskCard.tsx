'use client';

import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';

import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { taskSchema } from '@/schema/tasks';
import { deleteTask, editTask } from '@/lib/queries/tasks';
import Link from 'next/link';

export default function TaskCard({
  task,
}: {
  task: z.infer<typeof taskSchema>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: editFn, isPending: isEditPending } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { mutate: deleteFn, isPending: isDeletePending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const markAsCompleted = () => {
    editFn({
      ...task,
      color: `#${task.color}`,
      completed: !task.completed,
    });
  };

  const handleDelete = () => {
    deleteFn(task.id);
  };

  return (
    <div className="relative flex w-full items-start justify-between rounded-lg border border-muted-foreground/10 bg-muted p-4 text-card-foreground">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={markAsCompleted}
          disabled={isEditPending}
          className="rounded-full"
        />
        <Link
          href={`/edit/?id=${encodeURIComponent(task.id)}&title=${encodeURIComponent(task.title)}&color=${encodeURIComponent(task.color)}&completed=${String(task.completed)}`}
          className="min-w-0 overflow-hidden"
        >
          <p
            className={cn(
              task.completed && 'text-muted-foreground line-through'
            )}
          >
            {task.title}
          </p>
        </Link>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="-mt-2 flex-shrink-0">
            <Trash2Icon className="size-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
