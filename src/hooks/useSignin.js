import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
// import auth from '../firebase/index.js';

export default function useSignin() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email, password) => {
        try {
            setLoading(true)
            let res = await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
           return res.user;
        } catch (e) {
            setLoading(false)
            setError(e.message);
        }
    }

  return { error, loading, signIn };
  // no return jsx
}
