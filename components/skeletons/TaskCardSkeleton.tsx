import { Skeleton } from '@/components/ui/skeleton';

export default function TaskCardSkeleton() {
  return (
    <div className="flex h-16 w-full animate-pulse items-start justify-between rounded-lg border border-muted-foreground/10 bg-muted p-4 text-card-foreground">
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-5 w-10" />
    </div>
  );
}
