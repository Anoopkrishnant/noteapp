"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./Create.css";

function CreateNoteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams?.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (noteId) {
      try {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const existingNote = storedNotes.find((note) => note.id === noteId);
        if (existingNote) {
          setTitle(existingNote.title);
          setContent(existingNote.content);
        } else {
          setError("Note not found");
          setTimeout(() => router.push("/"), 2000);
        }
      } catch (error) {
        console.error("Error loading note:", error);
        setError("Error loading note");
      }
    }
  }, [noteId, router]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const currentTime = new Date().toLocaleTimeString();

      if (noteId) {
        const updatedNotes = storedNotes.map((note) =>
          note.id === noteId
            ? { ...note, title, content, time: currentTime }
            : note
        );
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
      } else {
        const newNote = {
          id: Date.now().toString(),
          title,
          content,
          time: currentTime,
        };
        localStorage.setItem("notes", JSON.stringify([...storedNotes, newNote]));
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Error saving note");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h2>{noteId ? "Update Note" : "Create Note"}</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        required
      />
      <button onClick={handleSave}>{noteId ? "Update Note" : "Save Note"}</button>
    </div>
  );
}

export default function CreateNotePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateNoteContent />
    </Suspense>
  );
}
