"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  return (
    <div>
      <p>Sorry, something went wrong</p>

      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}
