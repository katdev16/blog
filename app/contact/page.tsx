"use client"

import { useState } from "react";
import { header as Header } from "@/components/common/Navbar/header";

export default function Contact() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function submit(e: React.FormEvent) {
		e.preventDefault();
		// UI-only: just clear and show a toast or console
		console.log("Contact submit (UI only)", form);
		setForm({ name: "", email: "", message: "" });
		alert("Message sent (UI only)");
	}

	return (

        <>
        <Header/>
		<div className="min-h-screen bg-zinc-50 dark:bg-black py-16">
			<main className="mx-auto max-w-3xl px-6">
				<h1 className="text-3xl font-bold mb-4 text-black dark:text-zinc-50">Contact</h1>
				<form onSubmit={submit} className="space-y-4">
					<div>
						<label className="block text-sm">Name</label>
						<input name="name" value={form.name} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm">Email</label>
						<input name="email" value={form.email} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm">Message</label>
						<textarea name="message" value={form.message} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Send</button>
				</form>
			</main>
		</div>
        </>
	);
}
