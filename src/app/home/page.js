import NotesPage from "@/components/Notes/notes";
import { Suspense } from "react";


export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesPage />
    </Suspense>
  );
}
