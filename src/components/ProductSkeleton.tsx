export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-200 w-2/3 rounded" />
          <div className="h-6 bg-gray-200 w-1/4 rounded" />
        </div>
        <div className="h-4 bg-gray-200 w-full rounded mb-2" />
        <div className="h-4 bg-gray-200 w-3/4 rounded mb-6" />
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-gray-200 w-24 rounded-full" />
          <div className="h-6 bg-gray-200 w-24 rounded-full" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 bg-gray-200 w-1/2 rounded-xl" />
          <div className="h-12 bg-gray-200 w-1/2 rounded-xl" />
        </div>
      </div>
    </div>
  );
} 