// функцію для запиту на реєстрацію нового користувача
"use client";

import nextServer from "./api";
import { NewNoteData, Note } from "@/types/note";
import { User, AuthData } from "@/types/user";

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const registerUser = async (data: AuthData): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: AuthData): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};
