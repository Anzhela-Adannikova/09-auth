import { Note } from "@/types/note";
import axios from "axios";
import { cookies } from "next/headers";
import nextServer from "./api";
import { User } from "@/types/user";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

// перевірка сесії
// export async function checkServerSession(): Promise<{ user: User }> {
//   const cookieStore = await cookies();
//   const res = await nextServer.get("/auth/session", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return res.data;
// }

export async function checkServerSession() {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}
// export async function checkServerSession() {
//   const cookieStore = await cookies();
//   try {
//     const res = await nextServer.get<User>("/auth/session", {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     return res.data;
//   } catch {
//     return null;
//   }
// }

// // отримування користувача після сесії
// export const getMeServer = async (): Promise<User> => {
//   const cookiesStore = await cookies();
//   const res = await nextServer.get<User>("/auth/me", {
//     headers: {
//       Cookie: cookiesStore.toString(),
//     },
//   });
//   return res.data;
// };

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNoteService> => {
  const cookiesStore = await cookies();
  // const authCookie = cookiesStore.get("auth_token");

  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;
  if (tag && tag !== `All`) params.tag = tag;

  const res = await axios.get<FetchNoteService>(`${baseURL}/notes`, {
    headers: {
      Cookie: cookiesStore.toString(),
    },
    withCredentials: true,
    params,
  });
  return res.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get("auth_token");

  const res = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: {
      Cookie: `auth_token=${authCookie?.value}`,
    },
    withCredentials: true,
  });
  return res.data;
};
