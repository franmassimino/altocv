export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="space-y-6 text-center">
        {/* Logo Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 h-20 w-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            <span className="text-primary">ALTO</span>
            <span className="text-foreground">CV</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
