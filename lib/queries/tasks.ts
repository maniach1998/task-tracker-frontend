import { createTaskSchema, editTaskSchema, taskSchema } from '@/schema/tasks';
import { QueryFunction } from '@tanstack/react-query';
import { z } from 'zod';

export const fetchAllTasks: QueryFunction<
  z.infer<typeof taskSchema>[],
  string[]
> = async () => {
  const response = await fetch('http://localhost:4000/tasks');
  const { success, message, tasks } = await response.json();

  if (!success) {
    throw new Error(message);
  }

  return tasks;
};

export const createTask = async (task: z.infer<typeof createTaskSchema>) => {
  const response = await fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  const { success, message, task: createdTask } = await response.json();

  if (!success) {
    throw new Error(message);
  }

  return createdTask;
};

export const editTask = async (
  task: z.infer<typeof editTaskSchema> & { id: string }
) => {
  const response = await fetch(`http://localhost:4000/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  const { success, message, task: editedTask } = await response.json();

  if (!success) {
    throw new Error(message);
  }

  return editedTask;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'DELETE',
  });

  const { success, message } = await response.json();

  if (!success) {
    throw new Error(message);
  }

  return { success, message };
};
