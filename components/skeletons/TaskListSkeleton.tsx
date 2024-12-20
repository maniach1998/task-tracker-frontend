import TaskCardSkeleton from './TaskCardSkeleton';

export default function TaskListSkeleton() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-3">
      {Array(5)
        .fill(null)
        .map((_, idx) => (
          <TaskCardSkeleton key={idx} />
        ))}
    </section>
  );
}
