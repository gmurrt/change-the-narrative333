'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/utils';

export default function RegisterGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push('/dashboard');
        } else {
          setReady(true); // Not verified, show register form
        }
      } else {
        setReady(true); // Not signed in, show register form
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!ready) return <div className="flex justify-center items-center min-h-screen "><p>Please Wait...</p></div>;

  return <div className='min-h-screen'>{children}</div>;
}
