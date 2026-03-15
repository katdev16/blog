"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest, createPostRequest, updatePostRequest, deletePostRequest } from '../../store/slices/postsSlice';
import { loginRequest } from '../../store/slices/authSlice';
import { selectPosts, selectPostsLoading } from '../../store/selectors/postsSelectors';
import { selectAuthLoading, selectAuthToken, selectUser } from '../../store/selectors/authSelectors';

export default function TestRedux() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsLoading = useSelector(selectPostsLoading);
  const authLoading = useSelector(selectAuthLoading);
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPostsRequest({ page: 1, pageSize: 6 }));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Redux + Saga Test Page</h1>

      <section className="mb-4">
        <h2 className="font-semibold">Auth</h2>
        <button className="mr-2 p-2 bg-blue-600 text-white rounded" onClick={() => dispatch(loginRequest({ username: 'demo', password: 'x' }))} disabled={authLoading}>
          {authLoading ? 'Logging in…' : 'Login (demo)'}
        </button>
        <div className="mt-2">User: {user ? user.name : 'not logged in'}</div>
        <div>Token: {token ?? 'none'}</div>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Posts</h2>
        <div className="mb-2">
          <button className="mr-2 p-2 bg-green-600 text-white rounded" onClick={() => dispatch(fetchPostsRequest({ page: 1, pageSize: 6 }))}>
            Refresh Posts
          </button>
          <button
            className="mr-2 p-2 bg-teal-600 text-white rounded"
            onClick={() => dispatch(createPostRequest({ title: 'Created via UI', shortDescription: 'UI-created', longDescription: 'Body' }))}
          >
            Create Post
          </button>
        </div>
        <div>Loading: {String(postsLoading)}</div>
        <ul className="mt-2 space-y-2">
          {posts.slice(0, 10).map((p: any) => (
            <li key={p.id} className="p-2 border rounded">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-zinc-600">{p.shortDescription}</div>
              <div className="mt-2">
                <button className="mr-2 p-1 bg-orange-500 text-white rounded" onClick={() => dispatch(updatePostRequest({ id: p.id, data: { title: p.title + ' (updated)' } }))}>
                  Update
                </button>
                <button className="p-1 bg-red-600 text-white rounded" onClick={() => dispatch(deletePostRequest({ id: p.id }))}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-sm text-zinc-500 mt-4">Open Redux DevTools to watch actions and state. Check browser localStorage for key `auth_token` after login.</div>
    </div>
  );
}
