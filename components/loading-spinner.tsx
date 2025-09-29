export function LoadingSpinner({ className = "" }: { className?: string }) {
  return <div className={`animate-spin rounded-full border-2 border-muted border-t-primary ${className}`} />
}
