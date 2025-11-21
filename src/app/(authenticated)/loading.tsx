export default function AuthenticatedLoading() {
  return (
    <div className="min-h-screen flex">
      {/* Main Content Skeleton - Dashboard Style */}
      <main className="flex-1 ml-64">
        <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="space-y-3">
            <div className="h-9 w-72 bg-gradient-to-r from-muted to-muted/50 rounded" />
            <div className="h-5 w-56 bg-gradient-to-r from-muted to-muted/50 rounded" />
          </div>

          {/* Card Skeleton */}
          <div className="border rounded-xl p-12 bg-card">
            <div className="max-w-md mx-auto space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-gradient-to-br from-muted to-muted/50 rounded-lg" />
              </div>

              {/* Title */}
              <div className="h-8 w-full bg-gradient-to-r from-muted via-muted/70 to-muted rounded mx-auto" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gradient-to-r from-muted to-muted/50 rounded mx-auto" />
                <div className="h-5 w-2/3 bg-gradient-to-r from-muted to-muted/50 rounded mx-auto" />
              </div>

              {/* Button */}
              <div className="h-11 w-36 bg-gradient-to-r from-primary/20 to-primary/30 rounded-md mx-auto" />

              {/* Footer text */}
              <div className="h-4 w-48 bg-gradient-to-r from-muted to-muted/50 rounded mx-auto" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
