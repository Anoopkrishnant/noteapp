"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/Cards/card";
import "./Home.css";

export default function NotesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colors = ["bg-purple", "bg-orange", "bg-green", "bg-yellow"];
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const tempNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(tempNotes);
  }, []);

  useEffect(() => {
    const searchQuery = searchParams?.get("search")?.toLowerCase() || ""; 
  
    if (searchQuery) {
      const filtered = notes.filter((note) => {
        const title = note.title?.toLowerCase() || ""; 
        const content = note.content?.toLowerCase() || ""; 
        return title.includes(searchQuery) || content.includes(searchQuery);
      });
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchParams, notes]);
  

  const saveNotes = (items) => {
    localStorage.setItem("notes", JSON.stringify(items));
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = (note) => {
    if (note) {
      const tempNotes = [...notes.map((n) => (n.id === note.id ? note : n))];
      setNotes(tempNotes);
      setCurrentNote(null);
      saveNotes(tempNotes);
    }
  };

  const handleDeleteNote = (noteId) => {
    const tempNotes = [...notes.filter((n) => n.id !== noteId)];
    setNotes(tempNotes);
    saveNotes(tempNotes);
  };

  return (
    <div className="container">
      <h2>My Notes</h2>
      <div className="card-container">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              time={note.time}
              items={
                typeof note.content === "string" ? note.content.split("\n") : []
              }
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              bgColor={colors[index % colors.length]}
            />
          ))
        ) : (
          <p className="no-notes">
            {searchParams?.get("search")
              ? "No matching notes found"
              : "No notes available"}
          </p>
        )}
      </div>
      <button className="add-note-btn" onClick={() => router.push("/create")}>
        +
      </button>
    </div>
  );
}
