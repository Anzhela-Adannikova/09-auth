// функцію для запиту на реєстрацію нового користувача
"use client";

import api from "./api";
import { NewNoteData, Note } from "@/types/note";
import { User } from "@/types/user";

interface AuthData {
  email: string;
  password: string;
}

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const registerUser = async (data: AuthData): Promise<User> => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};
