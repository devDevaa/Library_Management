import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
// import auth from '../firebase/index.js';

export default function useSignup() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const singUp = async (email, password) => {
        try {
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth, email, password)
            setLoading(false)
           return res.user;
        } catch (e) {
            setLoading(false)
            setError(e.message);
        }
    }

  return { error, loading, singUp };
  // no return jsx
}
