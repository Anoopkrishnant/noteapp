import React from "react";
import { MdEditSquare } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import "./Card.css";
import { useRouter } from "next/navigation";

const Card = ({ id, title, time, items, bgColor, onUpdate, onDelete }) => {
  const router = useRouter();

  const handleEdit = () => {
    // Use the correct storage key 'notes' instead of 'cards'
    const storedData = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToEdit = storedData.find((note) => note.id === id);

    if (noteToEdit) {
      const queryParams = new URLSearchParams({ id: noteToEdit.id }).toString();
      router.push(`/create?${queryParams}`);
    } else {
      console.error("Note not found!");
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className={`card ${bgColor}`}>
      <div className="card-header">
        <h3>{title}</h3>
        <span>{time}</span>
      </div>
      <ul className="card-content">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="card-actions">
        <MdEditSquare className="edit-icon" onClick={handleEdit} />
        <FaDeleteLeft className="delete-icon" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default Card;
