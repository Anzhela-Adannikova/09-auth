"use client";

import { fetchNoteById } from "@/lib/api/serverApi";
import css from "./NoteDetails.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams();

  const parseId = Number(id);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", parseId],
    queryFn: () => fetchNoteById(parseId),
    refetchOnMount: false,
  });

  if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn}>Back</button>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date: {note.createdAt}</p>
      </div>
    </div>
  );
}
