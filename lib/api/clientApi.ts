"use client";

import nextServer from "./api";
import { NewNoteData, Note } from "@/types/note";
import { AuthData, UserRegister, UserLogin } from "@/types/user";

export interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNoteService> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;
  if (tag && tag !== `All`) params.tag = tag;
  console.log("params", params);
  const res = await nextServer.get<FetchNoteService>(`/notes`, {
    params,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);

  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const registerUser = async (data: AuthData): Promise<UserRegister> => {
  const res = await nextServer.post<UserRegister>("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: AuthData): Promise<UserLogin> => {
  const res = await nextServer.post<UserLogin>("/auth/login", data);
  return res.data;
};

export interface CheckSessionRes {
  message: string;
}
export const checkSession = async (): Promise<CheckSessionRes> => {
  const res = await nextServer.get<CheckSessionRes>("/auth/session");
  return res.data;
};

export const getMe = async (): Promise<UserLogin> => {
  const res = await nextServer.get<UserLogin>("/users/me");
  return res.data;
};

export const logOut = async () => {
  await nextServer.post("/auth/logout");
};

export const updateUser = async (data: {
  username: string;
}): Promise<UserLogin> => {
  const res = await nextServer.patch<UserLogin>("/users/me", data);
  return res.data;
};
