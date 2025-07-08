"use client";

import css from "./NotPreview.module.css";
import type { Note } from "@/types/note";

type NoteParamsProps = {
  note: Note;
  onClose: () => void;
};

export default function NotPreview({ note, onClose }: NoteParamsProps) {
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={onClose}>
        Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
