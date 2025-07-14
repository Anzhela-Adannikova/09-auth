"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { logOut } from "@/lib/api/clientApi";

const AuthNavigation = () => {
  const { isAuthenticated, clearIsAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
