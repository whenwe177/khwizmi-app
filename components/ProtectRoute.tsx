import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
        router.push('/');
    }
  }, [user])

  if (!user) return null;
  return children;
}

export default ProtectRoute