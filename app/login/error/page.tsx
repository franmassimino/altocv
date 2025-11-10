import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access was denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {getErrorMessage(error)}
          </p>
        </div>
        <div className="grid gap-6">
          <Link href="/login" className="w-full">
            <Button className="w-full" size="lg">
              Try Again
            </Button>
          </Link>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground">
          If the problem persists, please contact support
        </div>
      </div>
    </div>
  );
}
