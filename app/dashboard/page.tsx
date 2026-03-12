"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const auth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
		if (!auth) {
			router.push("/login");
			return;
		}
		setChecked(true);
	}, [router]);

	if (!checked) return <div className="min-h-screen" />;

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black py-16">
			<main className="mx-auto max-w-3xl px-6">
				<h1 className="text-3xl font-bold mb-4 text-black dark:text-zinc-50">Dashboard</h1>
				<p className="text-zinc-600 mb-6">Protected admin area — manage your posts (UI only).</p>

				<section className="space-y-3">
					<div className="p-4 border rounded bg-white">No posts yet — this is a UI placeholder.</div>
				</section>
			</main>
		</div>
	);
}
