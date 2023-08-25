import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import React from "react";

export const LoginPage = () => {
    return (
        <div>
            <button
                onClick={() => {
                    signInWithPopup(auth, googleProvider);
                }}
            >
                GoogleLogin
            </button>
        </div>
    );
};
