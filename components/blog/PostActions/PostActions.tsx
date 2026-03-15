"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePostRequest } from '../../../store/slices/postsSlice';

export default function PostActions({ id }: { id: string }) {
  const dispatch = useDispatch();

  function handleDelete() {
    if (!confirm('Delete this post? This action cannot be undone.')) return;
    console.log('Dispatching deletePostRequest for id:', id);
    dispatch(deletePostRequest({ id }));
  }

  return (
    <div className="mt-2">
      {/* <button className="px-2 py-1 text-sm bg-red-600 text-white rounded" onClick={handleDelete}>
        Delete
      </button> */}
    </div>
  );
}
