"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import logo from "../../../public/half-moon.png";

const Header = ({ notes = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    const query = e.target?.value || ""; 
    setSearchQuery(query);

    if (query.trim()) {
      router.push(`/home?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/home"); 
    }
  };

  const filteredResults = notes.filter((note) =>
    (note.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`wrapper ${styles.header}`}>
      <div className={styles.logoWrapper}>
        <Link href="/home">
          <Image src={logo} width={80} height={80} alt="logo" />
        </Link>
        <h3>Keep Notes</h3>
      </div>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearch} 
          className={styles.searchInput}
        />
      </div>
      <div className={styles.right}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
  
    </div>
  );
};

export default Header;
