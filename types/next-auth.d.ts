import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      credits: number;
      tier: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    credits?: number;
    tier?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    credits: number;
    tier: string;
  }
}
