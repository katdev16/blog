"use client"

import { useRouter } from "next/navigation";

export default function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();

  return (
    <div className="mt-6 flex gap-2 justify-center items-center">
      {Array.from({ length: totalPages }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            onClick={() => router.push(`/blog?page=${n}`)}
            className={`px-3 py-1 rounded ${n === page ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
