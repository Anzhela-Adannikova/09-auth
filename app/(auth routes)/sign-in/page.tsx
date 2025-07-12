"use client";

import { useRouter } from "next/router";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { isAxiosError } from "axios";
import { loginUser } from "@/lib/api/clientApi";

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await loginUser({ email, password });
      router.push("/profile");
    } catch (err) {
      if (isAxiosError(err)) {
        const message = err.response?.data?.message || "Login failed";
        setError(message);
      } else {
        setError("Error");
      }
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

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
