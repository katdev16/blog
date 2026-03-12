"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
	const [form, setForm] = useState({ email: "", password: "" });
	const router = useRouter();

	function update(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function submit(e: React.FormEvent) {
		e.preventDefault();
		// UI-only: set localStorage auth flag
		localStorage.setItem("auth", "true");
		router.push("/dashboard");
	}

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black py-16">
			<main className="mx-auto max-w-md px-6">
				<h1 className="text-2xl font-bold mb-4">Sign up</h1>
				<form onSubmit={submit} className="space-y-4">
					<div>
						<label className="block text-sm">Email</label>
						<input name="email" value={form.email} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm">Password</label>
						<input name="password" type="password" value={form.password} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Create account</button>
				</form>
			</main>
		</div>
	);
}
