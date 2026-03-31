"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { header as Header } from "../../components/common/Navbar/header";
  

export default function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();

	function update(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function submit(e: React.FormEvent) {
		console.log("Submitting login form", form);
		e.preventDefault();
		setError(null);
		setSubmitting(true);
		try {
			const res = await fetch('https://dummyjson.com/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: form.email,
					password: form.password,
					expiresInMins: 30,
				}),
			});
			const data = await res.json();
			console.log('Login response', { status: res.status, data });
			if (!res.ok) {
				setError(data?.message || 'Login failed');
				setSubmitting(false);
				return;
			}

			// dummyjson returns a token and user info on success
			if (data) {
				localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
				console.log('Login successful, redirecting to dashboard...');
				router.push('/dashboard');
			} else {
				setError('Login failed: missing token');
			}
		} catch (err: any) {
			console.error('Login error', err);
			setError(err?.message ?? 'Network error');
		} finally {
			setSubmitting(false);
		}
	}

	return (
        <>
        <div className="grid grid-cols-2 md:gap-250 ml-10 mt-10">
            <img src="/Blogstar.svg" alt="Blogstar" className="h-8" />
             <Link href="/signup" className="text-blue-600">Sign up</Link>
        </div>
        
		<div className="min-h-screen py-16">
            
			<main className="mx-auto max-w-md px-6">
				<h1 className="text-2xl font-bold mb-4">Login</h1>
				<form onSubmit={submit} className="space-y-4">
					<div>
						<label className="block text-sm">Email</label>
						<input name="email" value={form.email} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm">Password</label>
						<input name="password" type="password" value={form.password} onChange={update} className="w-full rounded border px-3 py-2" />
					</div>
					<button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Log in</button>
				</form>
			</main>
		</div>
        </>
	);
}
