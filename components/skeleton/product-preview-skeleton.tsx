import { Skeleton } from "../ui/skeleton";

const ProductPreviewSkeleton = () => {
  return (
    <div className="container mx-auto mt-12">
      {/* Yacht Title */}
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="size-12" />
      </div>

      {/* Main Image and Thumbnails Section */}
      <div className="mb-8">
        {/* Main Image */}
        <div className="relative mb-4">
          <Skeleton className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl" />
          
          {/* Navigation arrows */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          
          {/* Share button */}
          <div className="absolute top-4 right-4">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton 
              key={index} 
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg" 
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {/* Crew Section */}
        <div>
          <Skeleton className="h-8 w-20 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Design & Interiors Section */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          
          {/* Main Salon subsection */}
          <div className="mt-6">
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Additional sections */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewSkeleton;
