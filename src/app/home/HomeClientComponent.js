"use client";

import { useSearchParams } from "next/navigation";

export default function HomeClientComponent() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("key"); // Example usage

  return <div>Search Param Value: {paramValue}</div>;
}
