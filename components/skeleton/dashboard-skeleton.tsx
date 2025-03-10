import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-64 h-full border-r bg-muted/5">
        <div className="p-4 space-y-6">
          {/* Version switcher skeleton */}
          <div className="flex items-center space-x-3 p-2 rounded-lg border border-border/40">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <div className="h-5 w-5 bg-primary/20 rounded-md"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-20 bg-muted rounded"></div>
              <div className="h-3 w-14 bg-muted/70 rounded"></div>
            </div>
            <div className="h-4 w-4 bg-muted rounded-full ml-auto"></div>
          </div>

          {/* Search form skeleton */}
          <div className="relative">
            <div className="h-9 w-full bg-muted/30 rounded-md"></div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 bg-muted/50 rounded"></div>
          </div>

          {/* Navigation groups */}
          <div className="space-y-6">
            {/* Group 1 */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-muted/70 rounded font-medium"></div>
              <div className="space-y-1.5 pl-1">
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
              </div>
            </div>

            {/* Group 2 */}
            <div className="space-y-2">
              <div className="h-4 w-40 bg-muted/70 rounded font-medium"></div>
              <div className="space-y-1.5 pl-1">
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-primary/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
              </div>
            </div>

            {/* Group 3 */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted/70 rounded font-medium"></div>
              <div className="space-y-1.5 pl-1">
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
                <div className="h-8 w-full bg-muted/20 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4 bg-background">
          {/* Mobile menu button */}
          <div className="flex h-9 w-9 items-center justify-center rounded-md border">
            <div className="h-4 w-5 bg-muted/70 rounded"></div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-border mx-1"></div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block h-4 w-40 bg-muted/60 rounded"></div>
            <div className="hidden md:block h-3 w-3 flex items-center justify-center">
              <div className="h-1 w-1 bg-muted/80 rounded-full"></div>
            </div>
            <div className="h-4 w-28 bg-muted/80 rounded"></div>
          </div>

          {/* Right side items */}
          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 bg-muted/30 rounded-full"></div>
            <div className="h-8 w-8 bg-muted/30 rounded-full"></div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Page title */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-md" />
            <Skeleton className="h-4 w-full max-w-2xl rounded" />
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-4 bg-card">
              <div className="flex justify-between items-start mb-3">
                <Skeleton className="h-5 w-24 rounded" />
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-primary/30 rounded-sm"></div>
                </div>
              </div>
              <Skeleton className="h-9 w-20 rounded-md mb-2" />
              <Skeleton className="h-3 w-full rounded" />
            </div>

            <div className="rounded-xl border p-4 bg-card">
              <div className="flex justify-between items-start mb-3">
                <Skeleton className="h-5 w-28 rounded" />
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-primary/30 rounded-sm"></div>
                </div>
              </div>
              <Skeleton className="h-9 w-24 rounded-md mb-2" />
              <Skeleton className="h-3 w-full rounded" />
            </div>

            <div className="rounded-xl border p-4 bg-card">
              <div className="flex justify-between items-start mb-3">
                <Skeleton className="h-5 w-20 rounded" />
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-primary/30 rounded-sm"></div>
                </div>
              </div>
              <Skeleton className="h-9 w-16 rounded-md mb-2" />
              <Skeleton className="h-3 w-full rounded" />
            </div>
          </div>

          {/* Main content area */}
          <div className="rounded-xl border bg-card">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-32 rounded" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-8 col-span-1 rounded" />
                  <Skeleton className="h-8 col-span-3 rounded" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-8 col-span-1 rounded" />
                  <Skeleton className="h-8 col-span-3 rounded" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-8 col-span-1 rounded" />
                  <Skeleton className="h-8 col-span-3 rounded" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-8 col-span-1 rounded" />
                  <Skeleton className="h-8 col-span-3 rounded" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <Skeleton className="h-8 col-span-1 rounded" />
                  <Skeleton className="h-8 col-span-3 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
