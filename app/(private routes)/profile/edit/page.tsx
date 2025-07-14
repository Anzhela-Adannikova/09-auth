"use client";

import css from "./EditProfilePage.module.css";

import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/api/clientApi";
import Image from "next/image";
import { useAuth } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const { user } = useAuth();
  const setUser = useAuth((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    try {
      const user = await updateUser({ username });
      setUser(user);
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

        {user?.avatar && (
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
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
