// модальне вікно яке відкривається при створенні нотатки
"use client";

import React, { useEffect, useState } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    setMounted(true);

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClose}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button className={css.closeBtn} onClick={handleClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
