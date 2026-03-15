"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostRequest } from '../../../store/slices/postsSlice';
import { selectPostsLoading } from '../../../store/selectors/postsSelectors';

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const loading = Boolean(useSelector(selectPostsLoading as any));

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', shortDescription: '', longDescription: '', imageSrc: '' });
  const [success, setSuccess] = useState<string | null>(null);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      imageSrc: form.imageSrc || '',
    };
    dispatch(createPostRequest(payload as any));
    setForm({ title: '', shortDescription: '', longDescription: '', imageSrc: '' });
    setSuccess('Post created (if API call succeeded). Refresh to see changes.');
    setOpen(false);
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <button className="px-3 py-2 rounded bg-green-600 text-white" onClick={() => setOpen(true)}>Create Post</button>
        {success && <div className="text-sm text-green-700">{success}</div>}
      </div>

      {open && (
        <form onSubmit={submit} className="mt-4 p-4 border rounded bg-white dark:bg-zinc-900">
          <div className="mb-2">
            <label className="block text-sm">Title</label>
            <input name="title" value={form.title} onChange={update} className="w-full rounded border px-3 py-2" required />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Short description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={update} className="w-full rounded border px-3 py-2" required />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Long description</label>
            <textarea name="longDescription" value={form.longDescription} onChange={update} className="w-full rounded border px-3 py-2" rows={4} required />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Image URL</label>
            <input name="imageSrc" value={form.imageSrc} onChange={update} className="w-full rounded border px-3 py-2" />
          </div>

          <div className="flex items-center gap-2">
            <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Saving…' : 'Save'}</button>
            <button type="button" className="px-3 py-2 bg-gray-300 rounded" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
