// сторінку для реєстрації нового користувача
"use client";

import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";

import { registerUser } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";

export default function SignUP() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log({ email, password });

    try {
      const user = await registerUser({ email, password });
      setUser(user);
      router.push("/profile");
    } catch {
      setErrorMessage(
        "Registration failed. The account may already exist or an error occurred."
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
            Register
          </button>
        </div>

        <p className={css.error}>{errorMessage}</p>
      </form>
    </main>
  );
}
