export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div className="animate-pulse space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 bg-secondary rounded w-48"></div>

        {/* Header skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-8 bg-secondary rounded w-64 mx-auto"></div>
          <div className="h-4 bg-secondary rounded w-48 mx-auto"></div>
        </div>

        {/* Search form skeleton */}
        <div className="h-12 bg-secondary rounded"></div>

        {/* Info box skeleton */}
        <div className="h-24 bg-secondary rounded"></div>
      </div>
    </div>
  );
}
