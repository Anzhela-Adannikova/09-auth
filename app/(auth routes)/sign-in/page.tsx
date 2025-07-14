"use client";

import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { loginUser } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await loginUser({ email, password });
      setUser(user);
      router.push("/profile");
    } catch {
      setErrorMessage("The login or password is incorrect.");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{errorMessage}</p>
      </form>
    </main>
  );
}
