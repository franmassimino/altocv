export default function AuthenticatedLoading() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Skeleton */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r">
        <div className="flex flex-col h-full animate-pulse">
          {/* Logo Skeleton */}
          <div className="h-16 flex items-center px-4 border-b">
            <div className="h-7 w-28 bg-gradient-to-r from-primary/20 to-primary/40 rounded" />
          </div>

          {/* Navigation Skeleton */}
          <nav className="flex-1 p-3 space-y-2">
            <div className="h-10 bg-gradient-to-r from-muted to-muted/50 rounded-lg" />
            <div className="h-10 bg-gradient-to-r from-muted to-muted/50 rounded-lg" />
          </nav>

          <div className="h-px bg-border" />

          {/* Credits Skeleton */}
          <div className="p-4">
            <div className="h-16 bg-gradient-to-r from-muted to-muted/50 rounded-lg flex items-center gap-3 px-3">
              <div className="h-5 w-5 bg-primary/30 rounded-full" />
              <div className="space-y-1.5">
                <div className="h-3 w-12 bg-muted-foreground/20 rounded" />
                <div className="h-4 w-8 bg-muted-foreground/30 rounded" />
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* User Skeleton */}
          <div className="p-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-24 bg-muted-foreground/30 rounded" />
                <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </aside>

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
