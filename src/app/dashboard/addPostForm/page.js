// app/dashboard/AddPostForm.js
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }]);

    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setContent('');
      setError(null);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Post</button>
      {error && <p>{error}</p>}
    </form>
  );
}
