export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="animate-pulse space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 bg-secondary rounded w-48"></div>

        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-4 bg-secondary rounded w-40"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary rounded-lg h-32"></div>
            ))}
          </div>

          {/* Products grid skeleton */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-secondary rounded-lg h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
