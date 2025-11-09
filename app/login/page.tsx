import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = searchParams.callbackUrl || '/dashboard';

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6 md:p-10">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Left side - Login form */}
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome to AltoCV</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Sign in to create and manage your professional CVs with AI
                </p>
              </div>

              <form
                className="flex flex-col gap-4"
                action={async () => {
                  'use server';
                  await signIn('google', { redirectTo: callbackUrl });
                }}
              >
                <Button variant="outline" size="lg" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-5 w-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>

              <p className="text-balance text-center text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Right side - Hero image/content */}
            <div className="relative hidden bg-muted md:block">
              <div className="absolute inset-0 flex flex-col justify-center gap-4 p-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    AI-Powered CV Builder
                  </h2>
                  <p className="text-muted-foreground">
                    Create ATS-friendly CVs with conversational AI assistance, live preview, and intelligent analysis.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      ✓
                    </div>
                    <span className="text-sm">Real-time AI editing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      ✓
                    </div>
                    <span className="text-sm">ATS compatibility analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      ✓
                    </div>
                    <span className="text-sm">Professional templates</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
