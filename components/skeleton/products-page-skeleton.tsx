import { Skeleton } from "../ui/skeleton";

const ProductsPageSkeleton = () => {
  return (
    <div>
      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-10 py-8">
        <div className="hidden lg:block w-full lg:w-64 xl:w-80 lg:flex-shrink-0">
          <div className="sticky top-4 w-full space-y-4 p-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <Skeleton key={index} className="h-6 nth-[4n]:h-12 nth-[4n]:my-10 w-full rounded" />
            ))}
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-color">
                Available Boats
              </h2>
              <div className="text-sm text-muted-foreground">
              </div>
            </div>

            <div className="flex items-center gap-2 *:h-16">
              <Skeleton className="w-full rounded-xl" />
              <Skeleton className="w-full max-w-32 rounded-xl" />
            </div>

            <div className="lg:hidden">
              <Skeleton className="h-10 ml-auto w-32 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 *:aspect-[3.5/4]">
              <Skeleton className="w-full rounded-2xl" />
              <Skeleton className="w-full rounded-2xl" />
              <Skeleton className="w-full rounded-2xl" />
              <Skeleton className="w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageSkeleton;
