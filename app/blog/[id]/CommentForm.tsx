"use client"

import { useState } from "react";

export default function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submit comment for post", postId, text);
    alert("Comment submitted (UI only)");
    setText("");
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Write a comment" />
      <div>
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Post Comment</button>
      </div>
    </form>
  );
}
