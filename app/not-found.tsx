import { Metadata } from "next";
import css from "./Home.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page does not exist",
  openGraph: {
    title: "Page not found",
    description: "The page does not exist",
    url: "https://notehub.com/notes/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not found image",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <section className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <article className={css.description}>
          <p>Sorry, the page you are looking for does not exist.</p>

          <Link href="/">Go back home</Link>
        </article>
      </section>
    </div>
  );
}
