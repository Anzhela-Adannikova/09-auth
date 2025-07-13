import Link from "next/link";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import Image from "next/image";
import { getMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description: "View and manage your profile on NoteHub",
  openGraph: {
    title: "User Profile | NoteHub",
    description: "View and manage your profile on NoteHub",
    // url: "",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Profile Page",
      },
    ],
    type: "article",
  },
};

export default async function Profile() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
