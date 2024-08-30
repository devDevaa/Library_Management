import { useState } from "react";
import { signOut } from 'firebase/auth'
// import auth from '../firebase/index.js';

export default function useSignout() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const logout = async (email, password) => {
        try {
            setLoading(true)
            let res = await signOut(auth);
            setLoading(false)
           return res.user;
        } catch (e) {
            setLoading(false)
            setError(e.message);
        }
    }

  return { error, loading, logout };
  // no return jsx
}
