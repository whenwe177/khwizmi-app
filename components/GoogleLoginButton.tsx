import { auth, googleProvider } from '@/firebase'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'

const GoogleLoginButton = () => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <button onClick={loginWithGoogle}>Hello world</button>
  )
}

export default GoogleLoginButton