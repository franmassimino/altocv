import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import Image from 'next/image';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || '/dashboard';

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side - Login form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col">
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold mb-2">Inicia sesión en tu cuenta</h1>
                  <p className="text-balance text-sm text-muted-foreground mb-2">
                    Usa Google para acceder a tu cuenta
                  </p>
                </div>

                <FieldSeparator className=''>Continuar con</FieldSeparator>

                <Field>
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full my-2 py-6"
                    formAction={async () => {
                      'use server';
                      await signIn('google', { redirectTo: callbackUrl });
                    }}
                  >
                    <Image
                      src="/google.webp"
                      alt="Google"
                      width={20}
                      height={20}
                      className="size-5"
                    />
                    Acceder con Google
                  </Button>
                  <FieldDescription className="text-center text-xs">
                    Al continuar, aceptas nuestros{' '}
                    <a href="#" className="underline underline-offset-4">
                      Términos de Servicio
                    </a>{' '}
                    y{' '}
                    <a href="#" className="underline underline-offset-4">
                      Política de Privacidad
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Hero content */}
      <div className="relative hidden bg-muted lg:block p-10">
        <div className="absolute inset-0 bg-primary/20 " />
        <div className="relative flex h-full flex-col items-start justify-end">
        </div>
      </div>
    </div>
  );
}
