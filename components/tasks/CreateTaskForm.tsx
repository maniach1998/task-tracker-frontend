'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckIcon, Loader2Icon, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { createTaskSchema, taskSchema } from '@/schema/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, editTask } from '@/lib/queries/tasks';

const colors = [
  { name: 'Red', value: '#FF3B30' },
  { name: 'Orange', value: '#FF9500' },
  { name: 'Yellow', value: '#FFCC00' },
  { name: 'Green', value: '#34C759' },
  { name: 'Blue', value: '#007AFF' },
  { name: 'Indigo', value: '#5856D6' },
  { name: 'Purple', value: '#AF52DE' },
  { name: 'Pink', value: '#FF2D55' },
  { name: 'Brown', value: '#A2845E' },
];

export default function CreateTaskForm({
  mode = 'create',
  initialData,
}: {
  mode: 'create' | 'edit';
  initialData?: {
    id: string;
    title: string;
    color: string;
    completed: boolean;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const {
    mutate: edit,
    isPending: isEditPending,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: initialData?.title || '',
      color: `#${initialData?.color}` || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    if (mode === 'create') {
      mutate(data);

      if (isError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Task created!',
          description: `${data.title} has been added to your list`,
          variant: 'default',
        });
        router.push('/');
      }
    } else if (initialData) {
      edit({
        id: initialData.id,
        title: data.title,
        color: data.color,
        completed: initialData.completed,
      });

      if (isEditError) {
        toast({
          title: 'Error',
          description: editError.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Task updated!',
          description: `${data.title} has been updated`,
          variant: 'default',
        });
        router.push('/');
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex. Brush your teeth"
                  required
                  className="bg-secondary text-secondary-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.name}
                      className={`size-10 rounded-full transition-all hover:scale-110 ${
                        field.value === color.value
                          ? 'ring-2 ring-offset-2'
                          : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => field.onChange(color.value)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending || isEditPending}>
          {isPending || isEditPending ? (
            <>
              <Loader2Icon className="size-5 animate-spin" />{' '}
              {mode === 'create' ? 'Adding task' : 'Updating task'}
            </>
          ) : (
            <>
              {mode === 'create' ? 'Add Task' : 'Save'}
              {mode === 'create' ? (
                <PlusCircleIcon className="size-5" />
              ) : (
                <CheckIcon className="siize-5" />
              )}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
