export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-lg mx-auto px-4">
        <div className="h-8 bg-surface rounded-lg w-3/4 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-32 bg-surface rounded-lg"></div>
          <div className="h-24 bg-surface rounded-lg"></div>
          <div className="h-24 bg-surface rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
