import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getNoteById } from "@/lib/note.server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import NoteDetailsClient from "./NoteDetails.client";
interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await getNoteById(id);
    return pageMetadata(
      `${note.title} | NoteHub`,
      note.content.trim().slice(0, 160) ||
        `${note.title} — a ${note.tag} note on NoteHub.`,
      `/notes/${encodeURIComponent(id)}`,
    );
  } catch {
    return pageMetadata(
      "Note unavailable | NoteHub",
      "This note could not be loaded.",
      `/notes/${encodeURIComponent(id)}`,
    );
  }
}
export const dynamic = "force-dynamic";
export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const queryKey = ["note", id];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getNoteById(id),
  });
  if (queryClient.getQueryState(queryKey)?.status === "error")
    throw new Error(
      "Unable to load note details. The note may no longer exist.",
    );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
