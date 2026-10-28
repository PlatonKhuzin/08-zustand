import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
export const metadata: Metadata = pageMetadata(
  "Create note | NoteHub",
  "Create a new personal note. Your unfinished draft is saved automatically.",
  "/notes/action/create",
);
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
