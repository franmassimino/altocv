import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home } from 'lucide-react';

export default function LoginErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  const getErrorDetails = (error?: string) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          message: 'There is a problem with the server configuration.',
          details: [
            'This is typically a temporary issue',
            'Please try again in a few moments',
            'If the problem persists, contact support',
          ],
        };
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'We could not sign you in with Google.',
          details: [
            'Make sure you are using a valid Google account',
            'Check if cookies are enabled in your browser',
            'Try clearing your browser cache and cookies',
            'If the problem persists, the service may be temporarily unavailable',
          ],
        };
      case 'Verification':
        return {
          title: 'Verification Failed',
          message: 'The verification token has expired or has already been used.',
          details: [
            'Verification links expire after a certain time',
            'Please request a new verification link',
          ],
        };
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign-in Error',
          message: 'There was an error starting the sign-in process with Google.',
          details: [
            'This could be a temporary connection issue',
            'Try again in a few moments',
            'Check your internet connection',
          ],
        };
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          message: 'There was an error during the Google authentication callback.',
          details: [
            'This could be a temporary issue with Google services',
            'Try signing in again',
            'If the problem persists, contact support',
          ],
        };
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          message: 'We could not create your account.',
          details: [
            'There may be an issue with our database',
            'Please try again later',
            'Contact support if the issue continues',
          ],
        };
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Error',
          message: 'Could not create an account with this email.',
          details: [
            'The email may already be in use',
            'Try signing in instead of creating a new account',
          ],
        };
      case 'Callback':
        return {
          title: 'Callback Error',
          message: 'An error occurred during the authentication callback.',
          details: [
            'This is usually a temporary issue',
            'Please try signing in again',
          ],
        };
      case 'Default':
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          details: [
            'Please try again',
            'If the problem persists, contact support with error code: ' +
              (error || 'Unknown'),
          ],
        };
    }
  };

  const errorDetails = getErrorDetails(error);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{errorDetails.title}</h1>
            <p className="text-balance text-sm text-muted-foreground">
              {errorDetails.message}
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 text-sm font-semibold">What you can do:</h2>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {errorDetails.details.map((detail, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-muted-foreground/50">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3">
          <Link href="/login" className="w-full">
            <Button className="w-full" size="lg">
              Try Again
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {error && (
          <div className="text-balance text-center text-xs text-muted-foreground">
            Error code: <code className="rounded bg-muted px-1 py-0.5">{error}</code>
          </div>
        )}

        <div className="text-balance text-center text-xs text-muted-foreground">
          Need help? Contact us at{' '}
          <a
            href="mailto:support@altocv.com"
            className="underline hover:text-foreground"
          >
            support@altocv.com
          </a>
        </div>
      </div>
    </div>
  );
}
