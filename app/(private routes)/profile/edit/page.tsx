"use client";

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { getMe, updateUser } from "@/lib/api/clientApi";
import Image from "next/image";

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
        setUsername(currentUser.username);
      } catch (error) {
        console.log("Failed to load user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUser({ username });
      router.push("/profile");
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) return null;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
