"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotPreview/NotPreview";
import { fetchNoteById } from "@/lib/api/clientApi";
import { Note } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function NotePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  // const parseId = Number(id);

  const handleCloseModal = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  // if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleCloseModal}>
      <NotePreview note={note} onClose={handleCloseModal} />
    </Modal>
  );
}
