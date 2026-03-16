import React from 'react';

type Props = {
	params: { id: string };
};

export default function ContactByIdPage({ params }: Props) {
	const { id } = params;

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-4">Contact: {id}</h1>
			<p className="text-sm text-zinc-600">This is a placeholder contact detail page for id <strong>{id}</strong>.</p>
		</div>
	);
}
