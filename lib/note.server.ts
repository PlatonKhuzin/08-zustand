import { cache } from "react";
import { fetchNoteById } from "@/lib/api";
export const getNoteById = cache((id: string) => fetchNoteById(id));
