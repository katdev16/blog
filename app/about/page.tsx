import { header as Header } from "@/components/common/Navbar/header";

export default function About() {
	return (


        <>

         <Header/>
        
        
		<div className="min-h-screen  py-16">
			<main className="mx-auto max-w-3xl px-6">
				<h1 className="text-3xl font-bold mb-4 text-black dark:text-zinc-50">About This Blog</h1>
				<p className="text-zinc-600 dark:text-zinc-400">This is a simple demo blog built with Next.js App Router. It demonstrates pages, routing, and a small client-side auth flow for the dashboard.</p>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
					<p className="text-zinc-600 dark:text-zinc-400">Share knowledge, write tutorials, and learn web development together.</p>
				</section>
			</main>
		</div>

        </>
	);
}
